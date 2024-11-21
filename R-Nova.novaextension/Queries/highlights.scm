; highlights.scm

; Literals

(integer) @value.number
(float) @value.number
(complex) @value.number

(string) @string
(string (string_content (escape_sequence) @string.escape))

; Comments

(comment) @comment

; Operators

[
  "?" ":=" "=" "<-" "<<-" "->" "->>"
  "~" "|>" "||" "|" "&&" "&"
  "<" "<=" ">" ">=" "==" "!="
  "+" "-" "*" "/" "::" ":::"
  "**" "^" "$" "@" ":"
  "special"
] @operator

; Punctuation

[
  "("  ")"
  "{"  "}"
  "["  "]"
  "[[" "]]"
] @punctuation.bracket

(comma) @punctuation.delimiter

; Variables

(binary_operator
    lhs: (identifier) @identifier.variable
    operator: "<-"
)

(binary_operator
    lhs: (identifier) @identifier.variable
    operator: "="
)

; Functions

(binary_operator
    lhs: (identifier) @identifier.function
    operator: "<-"
    rhs: (function_definition) @definition.function
)

(binary_operator
    lhs: (identifier) @identifier.function
    operator: "="
    rhs: (function_definition) @definition.function
)

; Calls

(call function: (identifier) @identifier.function)

; Parameters

(parameters (parameter name: (identifier) @identifier.argument))
(arguments (argument name: (identifier) @identifier.argument))

; Namespace

(namespace_operator lhs: (identifier) @identifier.type)

(call
    function: (namespace_operator rhs: (identifier) @identifier.function)
)

; Keywords

(function_definition name: "function" @keyword.function)
(function_definition name: "\\" @operator)

[
  "in"
  (return)
  (next)
  (break)
] @keyword.condition

[
  "if"
  "else"
] @keyword.condition

[
  "while"
  "repeat"
  "for"
] @keyword.condition

[
  (true)
  (false)
] @value.boolean

[
  (null)
  (nan)
  (na)
] @value.null

[
  (inf)
  (dots)
  (dot_dot_i)
] @identifier.constant.builtin

; Error

(ERROR) @error
