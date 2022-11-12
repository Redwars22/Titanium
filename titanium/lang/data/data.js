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
var arrays = {};
var procedures = {};
function searchInVariablesAndConstants(name) {
    if (variables[name] != undefined || variables[name] == 0)
        return variables[name];
    if (constants[name] != undefined || constants[name] == 0)
        return constants[name];
    throw (error.VAR_DOES_NOT_EXIST);
}
function createVariable(command) {
    if (command.includes(keywords.VARIABLE)) {
        command = command.replace(keywords.VARIABLE, "");
        command = command.split(" " + operators.EQUAL + " ");
        if (checkIfIsTernaryExpression(command[1])) {
            variables[command[0]] = TernaryStatement(command[1]);
            return;
        }
        var typeOfVariable = checkType(command[1]);
        /*
        COMMAND[0] = the name of the variable
        COMMAND[1] = the value
        */
        switch (typeOfVariable) {
            case types.STRING:
                command[1] = command[1].replaceAll('"', "");
                variables[command[0]] = command[1];
                break;
            case types.BOOL:
                variables[command[0]] = parseBoolean(command[1]);
                break;
            case types.NUMBER:
                variables[command[0]] = Number(command[1]);
                break;
            case types.NULL:
                variables[command[0]] = "NULL";
                break;
            case types.UNDEFINED:
                variables[command[0]] = "UNDEFINED";
                break;
            case "mathExpr":
                variables[command[0]] = eval(parseMathExpression(command[1]));
                break;
            case "logicExpr":
                variables[command[0]] = eval(command[1]);
                break;
            case "arrRetrieveEl":
                variables[command[0]] = handleRetrieveElementFromArray(command[1]);
                break;
            default:
                throw error.UNKNOWN_TYPE;
                break;
        }
    }
}
function assignToVariable(command) {
    command = command.split(" " + operators.EQUAL + " ");
    var variable, value;
    variable = command[0];
    if (command[1].includes('"')) {
        command[1] = command[1].replaceAll('"', "");
    }
    value = command[1];
    var typeOfData = checkType(value);
    console.log(typeOfData);
    if (variables[variable] || variables[variable] == 0) {
        switch (typeOfData) {
            case types.BOOL:
                value = parseBoolean(value);
                variables[variable] = value;
                break;
            case types.NUMBER:
                value = Number(value);
                variables[variable] = value;
                break;
            case types.NULL || types.UNDEFINED:
                value = parseNullValue(value);
                break;
            case "mathExpr":
                variables[variable] = eval(parseMathExpression(value));
                break;
            case "logicExpr":
                variables[variable] = eval(value);
                break;
            case "arrRetrieveEl":
                variables[variable] = handleRetrieveElementFromArray(value);
                break;
            default:
                variables[variable] = value;
                break;
        }
    }
    else {
        throw "Cannot assign a value to \"".concat(variable, "\" because it either doesn't exist or is a constant. Are you trying to create a new variable?");
    }
}
function assignToVariableFromScanf(variable) {
    if (variables[variable] || variables[variable] == 0) {
        var value = window.prompt("Assign a value to \"".concat(variable, "\""));
        if (value === null)
            throw ("the get() function cannot return null");
        if (checkIfIsBoolean(value)) {
            variables[variable] = parseBoolean(value);
        }
        else if (checkIfIsNull(value) || checkIfIsUndefined(value)) {
            variables[variable] = parseNullValue(value);
        }
        else {
            variables[variable] = value;
        }
    }
    else {
        throw "Cannot assign a value to a variable that doesn't exist or to a constant";
    }
}
function getValueFromVariable(variable) {
    if (variables[variable] || variables[variable] == 0) {
        return variables[variable];
    }
    else if (constants[variable] || constants[variable] == 0) {
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
    tokens = tokens.split(" " + operators.EQUAL + " ");
    var name = tokens[0];
    var data = tokens[1];
    if (constants[name] || constants[name] == 0) {
        throw "you cannot change the value of a constant once it's been declared";
    }
    else {
        var typeOfData = checkType(data);
        if (checkIfIsTernaryExpression(data))
            data = TernaryStatement(data);
        switch (typeOfData) {
            case types.BOOL:
                data = parseBoolean(data);
                constants[name] = data;
                break;
            case types.NUMBER:
                data = Number(data);
                constants[name] = data;
                break;
            case types.NULL || types.UNDEFINED:
                data = parseNullValue(data);
                break;
            case types.STRING:
                constants[name] = data;
                break;
            case "mathExpr":
                constants[name] = eval(parseMathExpression(data));
                break;
            case "logicExpr":
                constants[name] = eval(data);
                break;
            case "arrRetrieveEl":
                constants[name] = handleRetrieveElementFromArray(data);
                break;
            default:
                throw (error.UNKNOWN_TYPE);
                break;
        }
    }
}
function checkIfCanBeChanged(identifier) {
    if (variables[identifier] != undefined) {
        return;
    }
    else
        throw ("you cannot increment/decrement ".concat(identifier, " because it either is a constant or doesn't exist"));
}
function increment(statement) {
    var varToIncrement = statement.replace(keywords.INCREMENT, '').trim();
    checkIfCanBeChanged(varToIncrement);
    var currentValue = variables[varToIncrement];
    if (currentValue != undefined)
        if (!isNaN(currentValue)) {
            variables[varToIncrement] = Number(currentValue) + 1;
            return;
        }
    throw ("you cannot increment ".concat(varToIncrement, " because it either doesn't belong to type number or doesn't exist"));
}
function decrement(statement) {
    var varToDecrement = statement.replace(keywords.DECREMENT, '').trim();
    checkIfCanBeChanged(varToDecrement);
    var currentValue = variables[varToDecrement];
    if (currentValue != undefined)
        if (!isNaN(currentValue)) {
            variables[varToDecrement] = Number(currentValue) - 1;
            return;
        }
    throw ("you cannot increment ".concat(varToDecrement, " because it either doesn't belong to type number or doesn't exist"));
}
function deleteFromBinding(identifier) {
    if (searchInVariablesAndConstants(identifier)) {
        if (variables[identifier] != undefined)
            delete variables[identifier];
        else if (constants[identifier] != undefined)
            delete constants[identifier];
        return;
    }
    else if (arrays[identifier] == undefined) {
        delete arrays[identifier];
        return;
    }
    throw (error.VAR_DOES_NOT_EXIST);
}
function saveInBinding(identifier, data) {
    if (searchInVariablesAndConstants(identifier) !== undefined) {
        if (variables[identifier] !== undefined || variables[identifier] == 0) {
            variables[identifier] = data;
            return;
        }
    }
    throw (error.VAR_DOES_NOT_EXIST);
}
