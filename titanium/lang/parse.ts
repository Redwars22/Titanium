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

let iterations = 0;
let currentLine = 0;
let hasThrownAnError = false;
const linesOfCodeArray = [];

function skipLine(): void {
  currentLine++;
}

function parseCode(code) {
  const linesOfCodeArray = code.split("\n");
  currentLine = 0;
  iterations = 0;
  hasThrownAnError = false;

  try {
    while (currentLine < linesOfCodeArray.length && !hasThrownAnError) {
      if (linesOfCodeArray[currentLine].includes(operators.MULTILINE_COMMENT)) {
        currentLine++;

        //It keeps skipping the next lines until it finds the other $$ token
        while (
          !linesOfCodeArray[currentLine].includes(operators.MULTILINE_COMMENT)
        ) {
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

      if (linesOfCodeArray[currentLine]?.match(callProcedureStatement)) {
        const identifier = linesOfCodeArray[currentLine].split(" ")[1];
        let i = 0;

        while (i < procedures[identifier].length) {
          parseLine(procedures[identifier][i]);
          i++;
        }

        currentLine++;
        continue;
      }

      if (linesOfCodeArray[currentLine].match(procedureDeclaration)) {
        let statement = linesOfCodeArray[currentLine];
        skipLine();

        const proc = {
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

      if (linesOfCodeArray[currentLine]?.match(ifStatement)) {
        const statement = linesOfCodeArray[currentLine].trim();
        const commandsToExecuteIfTrue: string[] = [];

        skipLine();

        while (linesOfCodeArray[currentLine].trim() !== keywords.END_IF) {
          commandsToExecuteIfTrue.push(linesOfCodeArray[currentLine].trim());
          skipLine();
        }

        let condition = statement
          .replace("IF", "")
          .replace(operators.STATEMENT_BLOCK_BEGIN, "").split(' ');

        for (let i = 0; i < condition.length; i++) {
          if (isNaN(condition[i]) && !condition[i].match(/.*[><\=\!]/)) {
            const typeOfData = checkType(condition[i]);

            if (typeOfData == types.BOOL) {
              condition[i] = parseBoolean(condition[i])
              continue;
            }

            condition[i] = checkType(condition[i]) === "arrRetrieveEl" ? handleRetrieveElementFromArray(condition[i].trim()) : searchInVariablesAndConstants(condition[i].trim())
          }
        }

        const evaluateCondition = eval(condition.join(''));

        if (evaluateCondition) {
          for (let i = 0; i < commandsToExecuteIfTrue.length; i++) {
            parseLine(commandsToExecuteIfTrue[i]);
          }
        }

        currentLine++;
        continue;
      }

      if (linesOfCodeArray[currentLine]?.match(forStatement)) {
        const statement = linesOfCodeArray[currentLine].trim();
        const commandsToBeRepeated: string[] = [];

        const parsed = statement
          .replace(keywords.FOR, "")
          .replace(operators.STATEMENT_BLOCK_BEGIN, "")


        skipLine();

        while (linesOfCodeArray[currentLine].trim() != keywords.END_FOR) {
          commandsToBeRepeated.push(linesOfCodeArray[currentLine]);
          skipLine();
        }

        let conditionIsStillTrue: boolean = true;

        while (conditionIsStillTrue) {
          let expression = parsed.trim().split(' ')

          for (let i = 0; i < expression.length; i++) {
            if (isNaN(expression[i]) && !expression[i].match(/.*[><\=\!]/)) {
              const typeOfData = checkType(expression[i]);

              if (typeOfData == types.BOOL) {
                expression[i] = parseBoolean(expression[i])
                continue;
              }

              expression[i] = searchInVariablesAndConstants(expression[i])
            }
          }

          if (eval(expression.join(''))) {
            for (let i = 0; i < commandsToBeRepeated.length; i++) {
              parseLine(commandsToBeRepeated[i])
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
        let returnStatementLine = linesOfCodeArray[currentLine];
        const valueOfReturnCode = returnStatementLine.replace(
          keywords.RETURN + " ",
          ""
        );
        const typeOfReturnCode = checkType(valueOfReturnCode);
        const returnCode =
          typeOfReturnCode == types.STRING || typeOfReturnCode == types.BOOL
            ? valueOfReturnCode
            : typeOfReturnCode == types.NUMBER
              ? Number(valueOfReturnCode)
              : typeOfReturnCode == "mathExpr"
                ? eval(parseMathExpression(valueOfReturnCode))
                : typeOfReturnCode == "logicExpr"
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
