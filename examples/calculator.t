DECL operation, x, y, result

output("WHICH ARITHMETIC OPERATION WOULD YOU LIKE TO DO?\n")
output("1-ADD, 2-SUBTRACT, 3-MULTIPLY, 4-DIVIDE, 5-EXIT\n->")

get(operation)

output("Insert a number: ")
get(x)
output("Insert another number: ")
get(y)

(operation) => {
	1:
		result = x + y
		output("\n\nResult: "..result)
		END
	2:
		result = x - y
		output("\n\nResult: "..result)
		END
	3:
		result = x * y
		output("\n\nResult: "..result)
		END
	4:
		result = x / y
		output("\n\nResult: "..result)
		END
	5:
	ELSE:
		output("Invalid operation!");
		RET
}
