START
	--Writing to a file
	TRY:
		DEF file: File("text.txt", "rw")
		DEF content: STR = "This is an example string"

		file.write(content)
		file.close()
	ERR fileErr:
		out("Unexpected error when trying to open the file")
	END

	--Open the file and read its contents
	TRY:
		DEF file: File("text.txt", "r")
		DEF content: file.get()
		file.close()
	ERR fileErr:
		out("Unexpected error when trying to open the file")
	END
END
