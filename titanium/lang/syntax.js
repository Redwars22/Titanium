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
        if (command.match(printLineCommand)) {
            printLine();
            return;
        }
        /* -------------------------- VARIABLES AND DATA TYPES -------------------------- */
        /* Array declaration */
        if (command.match(arrayDeclaration)) {
            handleCreateNewArray(command);
            return;
        }
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
        if (command.match(incrementStatement)) {
            increment(command);
            return;
        }
        if (command.match(decrementStatement)) {
            decrement(command);
            return;
        }
        if (command.match(deleteStatement)) {
            deleteFromBinding(command.split(' ')[1]);
            return;
        }
        if (command.match(mathCommand)) {
            handleMathFunction(command);
            return;
        }
        throw "Invalid token and/or character found or the command is not a valid Titanium keyword!";
    }
    catch (err) {
        throwError(err, currentLine);
        hasThrownAnError = true;
    }
}
