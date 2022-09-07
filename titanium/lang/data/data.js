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
var variables = {};
var constants = {};
function createVariable(command) {
    if (command.includes(keywords.VARIABLE)) {
        command = command.replace(keywords.VARIABLE, "");
        command = command.split(" = ");
        var typeOfVariable = checkType(command[1]);
        /*
        COMMAND[0] = the name of the variable
        COMMAND[1] = the value
        */
        if (typeOfVariable == types.STRING) {
            command[1] = command[1].replaceAll('"', "");
            variables[command[0]] = command[1];
            return;
        }
        if (typeOfVariable == types.BOOL) {
            if (command[1] == keywords.BOOL_TRUE)
                variables[command[0]] = true;
            if (command[1] == keywords.BOOL_FALSE)
                variables[command[0]] = false;
            return;
        }
        if (typeOfVariable == types.NUMBER) {
            variables[command[0]] = Number(command[1]);
            return;
        }
    }
}
function assignToVariable(command) {
    command = command.split(" = ");
    var variable, value;
    variable = command[0];
    if (command[1].includes('"')) {
        command[1] = command[1].replaceAll('"', "");
    }
    value = command[1];
    if (variables[variable]) {
        variables[variable] = value;
        console.log(variables);
    }
    else {
        throw "Cannot assign a value to \"" + variable + "\" because it either doesn't exist or is a constant. Are you trying to create a new variable?";
    }
}
function assignToVariableFromScanf(variable) {
    if (variables[variable]) {
        var value = window.prompt("Assign a value to \"" + variable + "\"");
        if (checkIfIsBoolean(value)) {
            variables[variable] = parseBoolean(value);
        }
        else {
            variables[variable] = value;
        }
    }
    else {
        throw "Cannot assign a value to a variable that doesn't exist";
    }
}
function getValueFromVariable(variable) {
    if (variables[variable]) {
        return variables[variable];
    }
    else if (constants[variable]) {
        return constants[variable];
    }
    return;
}
function assignToConstant(expr) {
    /*
      It basically creates a new constant and, if it already exists,
      it throws an error
      */
    var tokens = expr.replace(keywords.CONSTANT, "");
    tokens = tokens.split(" = ");
    var name = tokens[0];
    var data = tokens[1];
    if (constants[name]) {
        throw "you cannot change the value of a constant once it's been declared";
    }
    else {
        var typeOfData = checkType(data);
        /* It parses the data and its type */
        if (typeOfData == types.BOOL)
            data = parseBoolean(data);
        if (typeOfData == types.NUMBER)
            data = Number(data);
        constants[name] = data;
        console.log(constants);
    }
}
