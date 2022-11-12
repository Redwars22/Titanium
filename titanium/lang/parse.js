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
    var _a, _b, _c;
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
            if (linesOfCodeArray[currentLine].match(/ENDPROC/)) {
                currentLine++;
                continue;
            }
            if ((_a = linesOfCodeArray[currentLine]) === null || _a === void 0 ? void 0 : _a.match(callProcedureStatement)) {
                var identifier = linesOfCodeArray[currentLine].split(" ")[1];
                var i = 0;
                while (i < procedures[identifier].length) {
                    parseLine(procedures[identifier][i]);
                    i++;
                }
                currentLine++;
                continue;
            }
            if (linesOfCodeArray[currentLine].match(procedureDeclaration)) {
                var statement = linesOfCodeArray[currentLine];
                skipLine();
                var proc = {
                    identifier: statement.split(" ")[1],
                    commands: [],
                };
                while (!linesOfCodeArray[currentLine].match(/ENDPROC/)) {
                    proc.commands.push(linesOfCodeArray[currentLine].trim());
                    skipLine();
                }
                currentLine++;
                procedures[proc.identifier] = proc.commands;
                continue;
            }
            if ((_b = linesOfCodeArray[currentLine]) === null || _b === void 0 ? void 0 : _b.match(ifStatement)) {
                var statement = linesOfCodeArray[currentLine].trim();
                var commandsToExecuteIfTrue = [];
                skipLine();
                while (linesOfCodeArray[currentLine].trim() !== keywords.END_IF) {
                    commandsToExecuteIfTrue.push(linesOfCodeArray[currentLine].trim());
                    skipLine();
                }
                var condition = statement
                    .replace("IF", "")
                    .replace(operators.STATEMENT_BLOCK_BEGIN, "").split(' ');
                for (var i = 0; i < condition.length; i++) {
                    if (isNaN(condition[i]) && !condition[i].match(/.*[><\=\!]/)) {
                        var typeOfData = checkType(condition[i]);
                        if (typeOfData == types.BOOL) {
                            condition[i] = parseBoolean(condition[i]);
                            continue;
                        }
                        condition[i] = checkType(condition[i]) === "arrRetrieveEl" ? handleRetrieveElementFromArray(condition[i].trim()) : searchInVariablesAndConstants(condition[i].trim());
                    }
                }
                var evaluateCondition = eval(condition.join(''));
                if (evaluateCondition) {
                    for (var i = 0; i < commandsToExecuteIfTrue.length; i++) {
                        parseLine(commandsToExecuteIfTrue[i]);
                    }
                }
                currentLine++;
                continue;
            }
            if ((_c = linesOfCodeArray[currentLine]) === null || _c === void 0 ? void 0 : _c.match(forStatement)) {
                var statement = linesOfCodeArray[currentLine].trim();
                var commandsToBeRepeated = [];
                var parsed = statement
                    .replace(keywords.FOR, "")
                    .replace(operators.STATEMENT_BLOCK_BEGIN, "");
                skipLine();
                while (linesOfCodeArray[currentLine].trim() != keywords.END_FOR) {
                    commandsToBeRepeated.push(linesOfCodeArray[currentLine]);
                    skipLine();
                }
                var conditionIsStillTrue = true;
                while (conditionIsStillTrue) {
                    var expression = parsed.trim().split(' ');
                    for (var i = 0; i < expression.length; i++) {
                        if (isNaN(expression[i]) && !expression[i].match(/.*[><\=\!]/)) {
                            var typeOfData = checkType(expression[i]);
                            if (typeOfData == types.BOOL) {
                                expression[i] = parseBoolean(expression[i]);
                                continue;
                            }
                            expression[i] = searchInVariablesAndConstants(expression[i]);
                        }
                    }
                    if (eval(expression.join(''))) {
                        for (var i = 0; i < commandsToBeRepeated.length; i++) {
                            parseLine(commandsToBeRepeated[i]);
                        }
                        continue;
                    }
                    conditionIsStillTrue = false;
                }
                currentLine++;
                continue;
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
            currentLine++;
        }
    }
    catch (err) {
        throwWarning(err);
    }
}
