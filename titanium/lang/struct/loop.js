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
var WhileTokens = {
    condition: null,
    controlVariable: null,
};
var WhileBlockCommands = [];
var Format;
(function (Format) {
    Format[Format["SIMPLE_STATEMENT_WITH_CONDITION"] = 0] = "SIMPLE_STATEMENT_WITH_CONDITION";
})(Format || (Format = {}));
;
function WhileStatement(statement, format) {
    currentLine += 1;
    switch (format) {
        case Format.SIMPLE_STATEMENT_WITH_CONDITION:
            var tokens = statement.replace(keywords.WHILE + " ", '')
                .replace(" " + keywords.DO, '')
                .replace(':', '');
            var condition = tokens;
            var conditionTokens = condition.split(' ');
            /* If the tokens are variables, then replace them
            with their values, if the variable exists
            */
            if (isNaN(conditionTokens[0])) {
                WhileTokens.controlVariable = conditionTokens[0];
                if (variables[WhileTokens.controlVariable]) {
                    WhileTokens.condition =
                        condition.replace(WhileTokens.controlVariable, variables[WhileTokens.controlVariable]);
                }
                else
                    throw (error.INVALID_EXPRESSION);
            }
            else if (isNaN(conditionTokens[2])) {
                WhileTokens.controlVariable = conditionTokens[2];
                if (variables[WhileTokens.controlVariable]) {
                    WhileTokens.condition =
                        condition.replace(WhileTokens.controlVariable, variables[WhileTokens.controlVariable]);
                }
                else
                    throw (error.INVALID_EXPRESSION);
            }
            /*
            reads the next lines until it finds the ENDWHILE keyword. It also
            puts all the commands it finds inside the commands array.
            */
            while (!(linesOfCodeArray[currentLine].includes(keywords.END_WHILE))) {
                WhileBlockCommands.push(linesOfCodeArray[currentLine]);
                currentLine++;
            }
            WhileLoop();
            ClearWhileLoop();
            break;
        default:
            break;
    }
}
function WhileLoop() {
    while (eval(WhileLoop.condition)) {
        for (var command = 0; command < WhileBlockCommands.length; command++)
            parseLine(WhileBlockCommands[command]);
    }
}
function ClearWhileLoop() {
    WhileTokens.condition = null;
    WhileTokens.controlVariable = null;
    for (var i = WhileBlockCommands.length - 1; i < 0; i--)
        WhileBlockCommands.pop();
}
