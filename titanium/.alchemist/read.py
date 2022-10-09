import logs

def readSource(filename):
    if filename:
        source = open(filename)
        linesOfCode = source.readlines()
            
        print(linesOfCode)
    else: print(logs.FILE_NOT_FOUND_ERR)
