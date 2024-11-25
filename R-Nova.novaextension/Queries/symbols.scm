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
