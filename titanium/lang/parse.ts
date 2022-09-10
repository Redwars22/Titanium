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

let currentLine = 0;
let hasThrownAnError = false;

function parseLine(command) {
  try {
    /* -------------------------- COMMENTS -------------------------- */
    if (command.match(singleLineComment)) {
      return;
    }

    /* -------------------------- INPUT AND OUTPUT -------------------------- */

    if (command.match(clearConsoleCommand)) {
      clearConsole();
      return;
    }

    if (command.match(scanfCommand)) {
      scanfFunction(command);
      return;
    }

    if (command.match(printCommand)) {
      printFunction(command);
      return;
    }

    /* -------------------------- VARIABLES AND DATA TYPES -------------------------- */
    if (command.match(constantDeclaration)) {
      assignToConstant(command);
      return;
    }

    if (command.match(variableDeclaration)) {
      createVariable(command);
      return;
    }

    if (command.match(variableAssignment)) {
      assignToVariable(command);
      return;
    }

    throw "Invalid token and/or character found or the command is not a valid Titanium keyword!";
  } catch (err) {
    throwError(err, currentLine);
    hasThrownAnError = true;
  }
}

function parseCode(code) {
  const linesOfCodeArray = code.split("\n");
  currentLine = 0;
  hasThrownAnError = false;

  try {
    while (currentLine < linesOfCodeArray.length && !hasThrownAnError) {
      if (linesOfCodeArray[currentLine].includes("EXIT"))
        throw "the program has exited";

      if (linesOfCodeArray[currentLine].match(returnStatement)) {
        let returnStatementLine = linesOfCodeArray[currentLine];
        const valueOfReturnCode = returnStatementLine.replace("RET ", "");
        const typeOfReturnCode = checkType(valueOfReturnCode);
        const returnCode =
          typeOfReturnCode == types.STRING || typeOfReturnCode == types.BOOL
            ? valueOfReturnCode
            : typeOfReturnCode == types.NUMBER
            ? Number(valueOfReturnCode)
            : typeOfReturnCode == "mathExpr" || typeOfReturnCode == "logicExpr"
            ? eval(valueOfReturnCode)
            : "INVALID RETURN STATEMENT!";

        throw `the program has exited with ${returnCode}`;
      }

      if (linesOfCodeArray[currentLine] != "")
        parseLine(linesOfCodeArray[currentLine]);

      if (hasThrownAnError) break;

      currentLine++;
    }
  } catch (err) {
    throwWarning(err);
  }
}
