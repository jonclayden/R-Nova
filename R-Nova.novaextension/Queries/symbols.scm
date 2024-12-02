(binary_operator
	lhs: (identifier) @name
	operator: "<-"
	rhs: (function_definition
		parameters: (parameters) @arguments.target
	)
	(#set! role function)
	(#set! arguments.query "arguments.scm")
) @subtree

(binary_operator
	lhs: (identifier) @name
	operator: "="
	rhs: (function_definition
		parameters: (parameters) @arguments.target
	)
	(#set! role function)
	(#set! arguments.query "arguments.scm")
) @subtree

(binary_operator
	lhs: (identifier) @name
	operator: "<-"
	rhs: (_) @value @subtree
	(#set-if-not-match! @value "^\\s*(\\\\\\(|function\\s*\\()" role variable)
	(#set-if-match! @value "^\\s*(setClass|setRefClass)\\s*\\(" role class)
)

(binary_operator
	lhs: (identifier) @name
	operator: "="
	rhs: (_) @value @subtree
	(#set-if-not-match! @value "^\\s*(\\\\\\(|function\\s*\\()" role variable)
	(#set-if-match! @value "^\\s*(setClass|setRefClass)\\s*\\(" role class)
)

(binary_operator
	lhs: (_) @value @subtree
	operator: "->"
	rhs: (identifier) @name
	(#set-if-not-match! @value "^\\s*(\\\\\\(|function\\s*\\()" role variable)
	(#set-if-match! @value "^\\s*(setClass|setRefClass)\\s*\\(" role class)
)
