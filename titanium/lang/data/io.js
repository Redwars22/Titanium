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
function clearConsole() {
    document.querySelector(".console").innerText = "";
}
function scanfFunction(command) {
    command = command.replace(functions.GET, "");
    command = command.replace("(", "");
    command = command.replace(")", "");
    var variable = command;
    assignToVariableFromScanf(variable);
}
function printToConsole(data, isArray) {
    if (isArray) {
        document.querySelector(".console").innerText += "\n> [" + data + "]";
        return;
    }
    if (isNaN(data)) {
        if (data.match(string))
            document.querySelector(".console").innerText += "\n> " + data.replaceAll('"', "");
    }
    else
        document.querySelector(".console").innerText += "\n> " + data;
}
function printFunction(command) {
    var data = command.replace(functions.PRINT + "(", "").replace(")", "");
    /* It checks if its argument is a ternary function */
    if (checkIfIsTernaryExpression(data)) {
        printToConsole(TernaryStatement(data));
        return;
    }
    /* It checks the type of the argument given to the print function */
    var typeOfData = checkType(data);
    /* If it isn't either a string or a number, then it treats it as a variable and
    prints its value, if it exists.
    */
    switch (typeOfData) {
        case types.STRING:
            printToConsole(data);
            break;
        case types.NUMBER:
            printToConsole(data);
            break;
        case types.BOOL:
            printToConsole(data);
            break;
        case "mathExpr":
            printToConsole(eval(parseMathExpression(data)));
            break;
        case "logicExpr":
            printToConsole(eval(data));
            break;
        case "arrRetrieveEl":
            printToConsole(handleRetrieveElementFromArray(data));
            break;
        default:
            if (variables[data] !== undefined)
                printToConsole(variables[data]);
            else if (constants[data] !== undefined)
                printToConsole(constants[data]);
            else if (arrays[data] !== undefined)
                printToConsole(arrays[data], true);
            else
                throw error.VAR_DOES_NOT_EXIST;
            break;
    }
}
function printLine() {
    printToConsole("");
}
