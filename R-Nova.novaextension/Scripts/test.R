#!/usr/bin/env Rscript

# Check the workspace path is set
path <- Sys.getenv("WORKSPACE_PATH")
if (path == "")
    stop("Workspace path undefined")

# Work out the name of the package
name <- read.dcf(file.path(path,"DESCRIPTION"), "Package")
if (is.na(name) || name == "")
    stop("Unable to read DESCRIPTION file")

# Use testthat or tinytest, depending on which package's files seem to be present
if (file.exists(file.path(path, "tests", "testthat"))) {
    if (system.file(package="devtools") != "") {
        cat(paste0("Testing package \"", name, "\" (via devtools)...\n"))
        devtools::test(path, stop_on_failure=TRUE)
    } else {
        cat(paste0("Testing package \"", name, "\" (via testthat)...\n"))
        library(name, character.only=TRUE)
        testthat::test_dir(file.path(path, "tests", "testthat"), stop_on_failure=TRUE)
    }
} else if (file.exists(file.path(path, "inst", "tinytest"))) {
    cat(paste0("Testing package \"", name, "\" (via tinytest)...\n"))
    library(name, character.only=TRUE)
    library(tinytest)
    results <- test_all(path)
    print(results)
    if (any_fail(results))
        stop("Tests failed")
}
