var langserver = null;
var taskassistant = null;

// Asynchronous helper function to check script file permissions
// Courtesy Martin Kopischke
exports.makeExecutable = async function(paths) {
    const nonexec = []
    const binpaths = [].concat(paths)
    binpaths.forEach(path => {
        if (!nova.fs.access(path, nova.fs.F_OK)) {
            const msg = `Can’t locate extension binaries at path “${path}”.`
            throw new Error(msg)
        }
        if (!nova.fs.access(path, nova.fs.X_OK)) nonexec.push(path)
    })
    
    if (nonexec.length) {
        const options = { args: ['+x'].concat(nonexec) }
        const results = await runAsync('/bin/chmod', options)
        if (results.code > 0) throw new Error(results.stderr)
    }
    return nonexec.length
}

exports.activate = function() {
    // Do work when the extension is activated
    console.log("Activating R-Nova extension for workspace at " + nova.workspace.path)
    
    try {
        await exports.makeExecutable([nova.path.join(nova.extension.path,"Scripts","test.R")]);
        langserver = new RLanguageServer();
        taskassistant = new RTaskAssistant();
        nova.assistants.registerTaskAssistant(taskassistant);
    } catch (error) {
        console.error(error)
    }
}

exports.deactivate = function() {
    // Clean up state before the extension is deactivated
    if (langserver) {
        langserver.deactivate();
        langserver = null;
    }
}

class RTaskAssistant {
    constructor() {
        this.tasks = [];
        
        // The project looks like an R package
        if (this.workspaceContains("DESCRIPTION") && this.workspaceContains("tests")) {
            let testTask = new Task("Test Package");
            testTask.setAction(Task.Run, new TaskProcessAction(nova.path.join(nova.extension.path,"Scripts","test.R"), {
                env: { "WORKSPACE_PATH": "$WorkspaceFolder" },
                matchers: [ "testthat-error", "tinytest-error" ]
            }));
            this.tasks.push(testTask);
        }
    }
    
    workspaceContains(subpath) {
        return (nova.workspace.path && nova.workspace.contains(nova.path.join(nova.workspace.path, subpath)))
    }
    
    provideTasks() {
        return this.tasks;
    }
}

class RLanguageServer {
    constructor() {
        // Observe the configuration setting for the server's location, and restart the server on change
        nova.config.observe('r-nova.executable-path', function(path) {
            this.didChange();
        }, this);
        
        nova.config.observe('r-nova.enable-languageserver', function(value) {
            this.didChange();
        }, this);
    }
    
    deactivate() {
        this.stop();
    }
    
    didChange() {
        if (nova.config.get('r-nova.enable-languageserver', 'boolean')) {
            this.start(nova.config.get('r-nova.executable-path', 'string'));
        } else {
            this.stop();
        }
    }
    
    start(path) {
        if (this.languageClient) {
            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
        }
        
        // Use the default path to R
        if (!path) {
            path = '/usr/local/bin/R';
        }
        
        // Create the client
        var serverOptions = {
            path: path,
            args: ['--slave', '-e', 'languageserver::run()']
        };
        var clientOptions = {
            // The set of document syntaxes for which the server is valid
            syntaxes: ['r']
        };
        var client = new LanguageClient('r-languageserver', 'R Language Server', serverOptions, clientOptions);
        
        try {
            // Start the client
            client.start();
            
            // Add the client to the subscriptions to be cleaned up
            nova.subscriptions.add(client);
            this.languageClient = client;
        }
        catch (err) {
            // If the .start() method throws, it's likely because the path to the language server is invalid
            
            if (nova.inDevMode()) {
                console.error(err);
            }
        }
    }
    
    stop() {
        if (this.languageClient) {
            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
            this.languageClient = null;
        }
    }
}

