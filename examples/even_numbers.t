DECL result = 0

output("List of even numbers between 0 and 1000: ")

LOOP(i = 0, i <= 1000, i++):
	result = i % 2

	IF result IS 0:
		output(i.." ")
	END
END