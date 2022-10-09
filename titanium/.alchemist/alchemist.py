import read
import parse
import transpille
import logs

print(logs.WELCOME_MSG)
filename = input(logs.ENTER_FILE_NAME)
read.readSource(filename)