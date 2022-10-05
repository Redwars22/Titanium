/*
MIT License

Copyright (c) 2022 André Pereira - @Redwars22 (aka AndrewNation)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
//@ts-check
var iterations = 0;
var currentLine = 0;
var hasThrownAnError = false;
var linesOfCodeArray = [];
function skipLine() {
    currentLine++;
}
function parseCode(code) {
    var linesOfCodeArray = code.split("\n");
    currentLine = 0;
    iterations = 0;
    hasThrownAnError = false;
    try {
        while (currentLine < linesOfCodeArray.length && !hasThrownAnError) {
            if (linesOfCodeArray[currentLine].includes(operators.MULTILINE_COMMENT)) {
                currentLine++;
                //It keeps skipping the next lines until it finds the other $$ token
                while (!linesOfCodeArray[currentLine].includes(operators.MULTILINE_COMMENT)) {
                    skipLine();
                }
                currentLine++;
                //It should throw an error if it reaches the end of the file 
                //and still hasn't found the other $$ operator
            }
            if (linesOfCodeArray[currentLine].includes(keywords.EXIT))
                throw "the program has exited";
            if (linesOfCodeArray[currentLine].match(returnStatement)) {
                var returnStatementLine = linesOfCodeArray[currentLine];
                var valueOfReturnCode = returnStatementLine.replace(keywords.RETURN + " ", "");
                var typeOfReturnCode = checkType(valueOfReturnCode);
                var returnCode = typeOfReturnCode == types.STRING || typeOfReturnCode == types.BOOL
                    ? valueOfReturnCode
                    : typeOfReturnCode == types.NUMBER
                        ? Number(valueOfReturnCode)
                        : typeOfReturnCode == "mathExpr"
                            ? eval(parseMathExpression(valueOfReturnCode))
                            : typeOfReturnCode == "logicExpr"
                                ? eval(valueOfReturnCode)
                                : "INVALID RETURN STATEMENT!";
                throw "the program has exited with ".concat(returnCode);
            }
            if (linesOfCodeArray[currentLine] != "")
                parseLine(linesOfCodeArray[currentLine]);
            if (hasThrownAnError)
                break;
            if (linesOfCodeArray[currentLine].match(jumpStatement)) {
                var parsed = linesOfCodeArray[currentLine].split(' ');
                while (iterations < Number(parsed[2] - 1)) {
                    iterations++;
                    currentLine = Number(parsed[1] - 1);
                    while (currentLine < linesOfCodeArray.length / 2) {
                        parseLine(linesOfCodeArray[currentLine]);
                        currentLine++;
                    }
                }
            }
            currentLine++;
        }
    }
    catch (err) {
        throwWarning(err);
    }
}
