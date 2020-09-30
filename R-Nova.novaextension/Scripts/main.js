var langserver = null;

exports.activate = function() {
    // Do work when the extension is activated
    langserver = new RLanguageServer();
}

exports.deactivate = function() {
    // Clean up state before the extension is deactivated
    if (langserver) {
        langserver.deactivate();
        langserver = null;
    }
}


class RLanguageServer {
    constructor() {
        // Observe the configuration setting for the server's location, and restart the server on change
        nova.config.observe('r.executable-path', function(path) {
            this.start(path);
        }, this);
    }
    
    deactivate() {
        this.stop();
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
        var client = new LanguageClient('r-langserver', 'R Language Server', serverOptions, clientOptions);
        
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

