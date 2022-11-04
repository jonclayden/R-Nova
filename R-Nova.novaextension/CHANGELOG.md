## Version 0.3.2

- Highlighting has been improved for string escapes and constants.

## Version 0.3.1

- The "Test Package" task could fail with an error about a missing script, due to a file permissions issue. A workaround has been added to resolve this.

## Version 0.3

- If the workspace looks like an R package with tests (having a `DESCRIPTION` file and `tests` subdirectory), the extension now provides a prebuilt task for running the tests against the package. This is compatible with the `testthat` and `tinytest` unit testing frameworks.
- Function arguments are now also available as completions.
- Various syntax improvements have been made, for example to properly capture comments within function arguments and multiline string literals. The new pipe operator in R 4.1.0 is also now included.

## Version 0.2

- Code completion is now supported for R code. The extension provides static completions for `base` package functions and constants, and dynamic completion of parsed function and variable symbols.
- Functions and variables in user code are now symbolicated, for ease of navigation and for code completion.
- Code folding is now supported for braced code blocks.
- Several other improvements have been made to the syntax definition for better code highlighting.

## Version 0.1

- Initial release.
