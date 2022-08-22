IMP std.math AS math

DECL array = []
DECL number = 0

LOOP(i = 0, math.random(5, 20), i++):
	output("\nInsert a number here: ")
	get(number)
END

output("Numbers you entered: ")

LOOP(j = 0, j < array.length(), j++):
	output(array[j].." ")
END
