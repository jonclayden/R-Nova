# R-Nova

R-Nova provides R support for Nova. The following features are currently included.

- Syntax definitions for R and R Markdown, to allow highlighting of these files in Nova. Functions and variables in user code are also symbolicated for ease of navigation.
- Code completion for R, including both standard symbols (from the `base` package) and dynamically parsed function, argument and variable names from the current project.
- A prebuilt task for running tests against R packages, compatible with [`testthat`](https://testthat.r-lib.org) and [`tinytest`](https://github.com/markvanderloo/tinytest).
- An interface to the [`languageserver` R package](https://cran.r-project.org/package=languageserver) to provide linting and other language server features for R code.

Further functionality is being added gradually for deeper integration. If you would like to support development of the extension, code contributions ([via GitHub](https://github.com/jonclayden/R-Nova)) and tips ([via PayPal](https://paypal.me/jonclayden)) are both welcome.

The [R logo](https://www.r-project.org/logo/), used as the extension icon, is © 2016 The R Foundation. It is redistributed under the terms of the [Creative Commons Attribution-ShareAlike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/) (CC-BY-SA 4.0).
