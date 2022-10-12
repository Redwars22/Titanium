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

let isRunning = true;

type TernaryStatement = {
    condition: null | string;
    returnValueIfTrue: any;
    returnValueIfFalse: any;
}

type TitaniumArrayStructure = {
    name: null | string;
    data: any[];
    length: null | number;
}

type MathExpression = {
    left: number;
    operator: string;
    right: number;
}

type MathFunction = {
    operation: string;
    destination: string;
    arg1: number;
    arg2?: number | undefined;
    result: number | string | undefined;
}

const types = {
    STRING: "string",
    BOOL: "bool",
    NUMBER: "num",
    NULL: 'NULL',
    UNDEFINED: 'UNDEF'
};

const keywords = {
    ARRAY: 'ARR ',
    ARRAY_LENGTH: 'MAX',
    ARRAY_LENGTH_ALT: 'LEN',
    BOOL_TRUE: "TRUE",
    BOOL_FALSE: "FALSE",
    BOOL_YES: "YES",
    BOOL_NO: "NO",
    CONSTANT: "DEF ",
    DECREMENT: "DEC",
    DESTROY: "DEL",
    INCREMENT: "INC",
    VARIABLE: "DECL ",
    DO: "DO",
    EXIT: "EXIT",
    RETURN: "RET",
    REPEAT: "REP"
}

const operators = {
    ADD: '+',
    ARRAY_DEF: '[]',
    SUBTRACT: '-',
    MODULUS: '%',
    MULTIPLY: '*',
    DIVIDE: '/',
    TERNARY_CONDITION: '?',
    TERNARY_IF_ELSE: ':',
    EQUAL: '=',
    LEFT_PARENTHESIS: '(',
    RIGHT_PARENTHESIS: ')',
    ARRAY_START: '[',
    ARRAY_END: ']',
    ARRAY_ELEMENT_SEPARATOR: ',',
    MULTILINE_COMMENT: '$$'
}

const variables = {};
const constants = {};
const arrays = {};

const arrayDeclaration = /ARR .*[A-Za-z_] = \[.*[0-9A-Za-z_"!@]\]/gm;
const arrayRetrieveElement = /.*[A-Za-z_]\[.*[0-9A-Za-z_]\]/gm;
const clearConsoleCommand = /clear\(\)/g;
const constantDeclaration = /DEF .*[A-Za-z_] = "?.*[A-Za-z0-9\(\)]?"?/;
const decrementStatement = /DEC .*[A-Za-z_]/;
const deleteStatement = /DEL .*[A-Za-z_]/;
const incrementStatement = /INC .*[A-Za-z_]/;
const mathCommand = /MATH .*[A-Za-z0-9\[\]_ ]/;
const printCommand = /print\("?.*[\[\]0-9A-Z a-z!,_ ?:><=!]?"?\)/g;
const printLineCommand = /printLine()/gm;
const repeatCommand = /REP .*[0-9]( )?,( )?.*/g;
const returnStatement = /(RET) (.*[0-9A-Za-z])?/gm;
const scanfCommand = /get\(.*[A-Za-z_\[\]]\)/gi;
const singleLineComment = /--.*[A-Za-z0-9_ ]/gi;
const ternaryStatementRule = /.*["A-Za-z ><=!] ? .*["A-Z0-9a-z] : .*["A-Z0-9a-z]/gm;
const variableAssignment = /.*[A-Za-z_] = "?.*[A-Za-z0-9 ?:><=!\(\)]"?/gi;
const variableDeclaration = /DECL .*[A-Za-z_] = "?.*[A-Za-z0-9\+]?"?/gm;

const functions = {
    PRINT: 'print',
    GET: 'get',
}


const string = /\".*\"/gm;

function checkIfIsString(value): boolean {
    if (value.includes('"')) return true;

    return false;
}


function checkType(value): string {
    if (checkIfIsString(value)) return types.STRING;
    if (checkIfIsBoolean(value)) return types.BOOL;
    if (checkIfIsNumber(value)) return types.NUMBER;
    if (checkIfIsNull(value)) return types.NULL;
    if (checkIfIsUndefined(value)) return types.UNDEFINED;
    if (checkIfIsMathExpr(value)) return "mathExpr";
    if (checkIfIsLogicExpr(value)) return "logicExpr";
    if (checkIfIsArrayRetrieveElementStatement(value)) return "arrRetrieveEl";
}

const defaultUserInput = require('prompt-sync')();

function parseLine(command) {
    try {
        if (command.match(repeatCommand)) {
            handleRepeatStatement(command);
            return;
        }

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

        if (command.includes(keywords.EXIT))
            throw "the program has exited";

        if (command.match(returnStatement)) {
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

        throw "Invalid token and/or character found or the command is not a valid Titanium keyword!";
    } catch (err) {
        throwError(err, currentLine);
        hasThrownAnError = true;
        isRunning = false;
    }
}

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
        isRunning = false;
    }
}

const error = {
    VAR_DOES_NOT_EXIST: "the variable/constant you tried to access doesn't exist",
    INVALID_EXPRESSION: "the expression is invalid or the variable doesn't exist",
    FUNCTION_MISSING_ARG: "one or more of the required the arguments of the function is missing",
    RANDOM_INVALID_PARAM: "invalid parameters to the random() function. Both parameters should be of type number",
    UNKNOWN_TYPE: "Titanium couldn't guess the type automatically. Are you sure you used one of the supported types?",
    CANNOT_MODIFY_ARRY: "You cannot modify or redeclare an array that already exists",
    MISSING_PARAMS: "one or more of the required parameters is missing",
    NOT_NUMBER: "the argument of the function should be of number type"
}

function throwError(err, line) {
    console.error(`❌️ Line: ${line + 1} - ${err}`);
}

function throwWarning(msg) {
    console.warn(`⚠️ ${msg}`);
}


function clearConsole() {
    //CONSOLE --- document.querySelector(".console")!.innerText = "";
}

function concatenate(statement: string) {
    let tokens = statement.split('&&');

    for (let token = 0; token < tokens.length; token++) {
        tokens[token] = tokens[token].trim();

        if (tokens[token].includes("\"") && !(tokens[token].includes("\\\""))) {
            tokens[token] = tokens[token].replace("\"", "");
        }

        if (isNaN(tokens[token]) && !(tokens[token].includes("\""))) {
            if (tokens[token].match(arrayRetrieveElement)) {
                const data = handleRetrieveElementFromArray(tokens[token]);
                tokens[token] = data;
                continue;
            }

            const data = searchInVariablesAndConstants(tokens[token]);
            tokens[token] = data;
        }
    }

    printToConsole(tokens.join('').replace("\"", ''));
}

function scanfFunction(command) {
    command = command.replace(functions.GET, "");
    command = command.replace("(", "");
    command = command.replace(")", "");

    const variable = command;

    //It verifies if the argument of the function mentions an array
    if (variable.includes(operators.ARRAY_START) && variable.includes(operators.ARRAY_END)) {
        const array = variable.replace(operators.ARRAY_DEF, '');

        const arr = new TitaniumArray();

        if (arr.checkIfArrayExists(array)) {
            let value = defaultUserInput(`Insert a value for ${array}: `);

            if (value === null) throw ("the get() function cannot return null");

            if (isNaN(value))
                arrays[array].push("\"" + value + "\"");
            else arrays[array].push(value);
            return;
        }

        throw (`you cannot push a new value to ${array} because it doesn't exist`)
    }

    assignToVariableFromScanf(variable);
}

function printToConsole(data, isArray?: boolean) {
    if (isArray) {
        console.log(`[${data}]`);
        return;
    }

    if (isNaN(data)) {
        if (data.match(string))
            console.log(`${data.replaceAll(
                '"',
                ""
            )}`);
        else {
            console.log(`${data}`);
        }
    } else console.log(`${data}`);
}

function printFunction(command) {
    const data = command.replace(functions.PRINT + "(", "").replace(")", "");

    /* It checks if its argument is a ternary function */
    if (checkIfIsTernaryExpression(data)) {
        printToConsole(TernaryStatement(data));
        return;
    }

    if (data.includes('&&')) { concatenate(data); return; };

    /* It checks the type of the argument given to the print function */
    const typeOfData = checkType(data);
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
            if (variables[data] !== undefined) printToConsole(variables[data]);
            else if (constants[data] !== undefined) printToConsole(constants[data]);
            else if (arrays[data] !== undefined) printToConsole(arrays[data], true);
            else throw error.VAR_DOES_NOT_EXIST;
            break;
    }
}

function printLine() {
    printToConsole("");
}

function searchInVariablesAndConstants(name: string) {
    if (variables[name] != undefined || variables[name] == 0) return variables[name];

    if (constants[name] != undefined || constants[name] == 0) return constants[name];

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

        const typeOfVariable = checkType(command[1]);

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
    let variable, value;

    variable = command[0];

    if (command[1].includes('"')) {
        command[1] = command[1].replaceAll('"', "");
    }

    value = command[1];
    const typeOfData = checkType(value);

    console.log(typeOfData)

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
    } else {
        throw `Cannot assign a value to "${variable}" because it either doesn't exist or is a constant. Are you trying to create a new variable?`;
    }
}

function assignToVariableFromScanf(variable) {
    if (variables[variable] || variables[variable] == 0) {
        const value = defaultUserInput(`Assign a value to "${variable}": `);

        if (value === null) throw ("the get() function cannot return null");

        if (checkIfIsBoolean(value)) {
            variables[variable] = parseBoolean(value);
        } else if (checkIfIsNull(value) || checkIfIsUndefined(value)) {
            variables[variable] = parseNullValue(value);
        } else {
            variables[variable] = value;
        }
    } else {
        throw "Cannot assign a value to a variable that doesn't exist";
    }
}

function getValueFromVariable(variable) {
    if (variables[variable] || variables[variable] == 0) {
        return variables[variable];
    } else if (constants[variable] || constants[variable] == 0) {
        return constants[variable];
    }

    return;
}

function assignToConstant(expr) {
    /*
    It basically creates a new constant and, if it already exists,
    it throws an error
    */

    let tokens = expr.replace(keywords.CONSTANT, "");
    tokens = tokens.split(" " + operators.EQUAL + " ");

    const name = tokens[0];
    let data = tokens[1];

    if (constants[name] || constants[name] == 0) {
        throw "you cannot change the value of a constant once it's been declared";
    } else {
        const typeOfData = checkType(data);

        if (checkIfIsTernaryExpression(data)) data = TernaryStatement(data);

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

function checkIfCanBeChanged(identifier: string) {
    if (variables[identifier] != undefined) {
        return;
    } else throw (`you cannot increment/decrement ${identifier} because it either is a constant or doesn't exist`)
}

function increment(statement) {
    const varToIncrement = statement.replace(keywords.INCREMENT, '').trim();
    checkIfCanBeChanged(varToIncrement);
    const currentValue = variables[varToIncrement];

    if (currentValue != undefined)
        if (!isNaN(currentValue)) {
            variables[varToIncrement] = currentValue + 1;
            return;
        }

    throw (`you cannot increment ${varToIncrement} because it either doesn't belong to type number or doesn't exist`)
}

function decrement(statement) {
    const varToDecrement = statement.replace(keywords.DECREMENT, '').trim();
    checkIfCanBeChanged(varToDecrement);
    const currentValue = variables[varToDecrement];

    if (currentValue != undefined)
        if (!isNaN(currentValue)) {
            variables[varToDecrement] = currentValue - 1;
            return;
        }

    throw (`you cannot increment ${varToDecrement} because it either doesn't belong to type number or doesn't exist`)
}

function deleteFromBinding(identifier: string) {
    if (searchInVariablesAndConstants(identifier)) {
        if (variables[identifier] != undefined)
            delete variables[identifier];
        else if (constants[identifier] != undefined)
            delete constants[identifier];

        return;
    } else if (arrays[identifier] == undefined) {
        delete arrays[identifier];
        return;
    }

    throw (error.VAR_DOES_NOT_EXIST);
}

function saveInBinding(identifier: string, data: any) {
    if (searchInVariablesAndConstants(identifier) !== undefined) {
        if (variables[identifier] !== undefined || variables[identifier] == 0) {
            variables[identifier] = data;
            return;
        }
    }

    throw (error.VAR_DOES_NOT_EXIST);
}
const Ternary = {
    condition: null,
    returnValueIfTrue: null,
    returnValueIfFalse: null,
} as TernaryStatement;

const ConditionTokens = {
    left: null,
    right: null,
}

/**
 * @param condition - it takes the condition
 * @description - if the condition has a variable or a constant, then the function
 * replaces it with the actual value. If the variable/constant hasn't been declared
 * prior to being used, it then throws an error
 */

function parseCondition(condition: string) {
    const tokens = condition.split(' ');

    ConditionTokens.left = tokens[0];
    ConditionTokens.right = tokens[2];

    if (isNaN(ConditionTokens.left)) {
        if (variables[ConditionTokens.left] !== undefined)
            Ternary.condition =
                Ternary.condition.replace(
                    ConditionTokens.left,
                    Number(variables[ConditionTokens.left])
                )
        else if (constants[ConditionTokens.left] !== undefined)
            Ternary.condition =
                Ternary.condition.replace(
                    ConditionTokens.left,
                    Number(constants[ConditionTokens.left])
                )
        else if (handleRetrieveElementFromArray(ConditionTokens.left) !== undefined) {
            const value = handleRetrieveElementFromArray(ConditionTokens.left);
            Ternary.condition = Ternary.condition.replace(
                ConditionTokens.left,
                value
            )
        }

        else throw (error.VAR_DOES_NOT_EXIST)
    }

    if (isNaN(ConditionTokens.right)) {
        if (variables[ConditionTokens.right] !== undefined)
            Ternary.condition =
                Ternary.condition.replace(
                    ConditionTokens.right,
                    Number(variables[ConditionTokens.right])
                )
        else if (constants[ConditionTokens.right] !== undefined)
            Ternary.condition =
                Ternary.condition.replace(
                    ConditionTokens.right,
                    Number(constants[ConditionTokens.right])
                )
        else if (handleRetrieveElementFromArray(ConditionTokens.right) !== undefined) {
            const value = handleRetrieveElementFromArray(ConditionTokens.right);
            Ternary.condition = Ternary.condition.replace(
                ConditionTokens.right,
                value
            )
        }
        else throw (error.VAR_DOES_NOT_EXIST)
    }
}

function TernaryStatement(ternaryExpr: string) {
    const ternaryBlocks = ternaryExpr.split(' ' + operators.TERNARY_CONDITION + ' ');
    Ternary.condition = ternaryBlocks[0];
    const returnValues = ternaryBlocks.join('')
        .replace(Ternary.condition, '')
        .split(' ' + operators.TERNARY_IF_ELSE + ' ');

    Ternary.returnValueIfTrue = returnValues[0];
    Ternary.returnValueIfFalse = returnValues[1];

    parseCondition(Ternary.condition);

    switch (eval(Ternary.condition)) {
        case true:
            const typeOfReturnValue = checkType(Ternary.returnValueIfTrue);

            if (typeOfReturnValue == 'boolean')
                return parseBoolean(Ternary.returnValueIfTrue);

            return Ternary.returnValueIfTrue;
            break;
        case false:
            const typeOfFalseReturnValue = checkType(Ternary.returnValueIfFalse);

            if (typeOfReturnValue == 'boolean')
                return parseBoolean(Ternary.returnValueIfFalse);

            return Ternary.returnValueIfFalse;
            break;
        default:
            throw ("unknown error while trying to parse ternary expression")
            break;
    }
}

function checkIfIsTernaryExpression(expr: string): boolean {
    try {
        if (expr.match(ternaryStatementRule)) return true;
    } catch (err) {
        return false;
    }

    return false;
}

const mathExprRules = {
    ADD: /.*[0-9 ]\+.*[0-9 ]/g,
    SUBTRACT: /.*[0-9 ]\-.*[0-9 ]/g,
    MULTIPLY: /.*[0-9 ]\*.*[0-9 ]/g,
    MODULUS: /.*[0-9 ]\%.*[0-9 ]/g,
    DIVISION: /.*[0-9 ]\/.*[0-9 ]/g,
};

function checkIfIsMathExpr(expr): boolean {
    if (expr.match(mathExprRules.ADD)) return true;

    if (expr.match(mathExprRules.SUBTRACT)) return true;

    if (expr.match(mathExprRules.DIVISION)) return true;

    if (expr.match(mathExprRules.MULTIPLY)) return true;

    if (expr.match(mathExprRules.MODULUS)) return true;

    return false;
}

function parseMathExpression(expr) {
    const expression: MathExpression = {
        left: 0,
        operator: "",
        right: 0
    };

    if (expr.match(mathExprRules.ADD))
        expression.operator = operators.ADD;
    else if (expr.match(mathExprRules.SUBTRACT))
        expression.operator = operators.SUBTRACT;
    else if (expr.match(mathExprRules.DIVISION))
        expression.operator = operators.DIVIDE;
    else if (expr.match(mathExprRules.MULTIPLY))
        expression.operator = operators.MULTIPLY;
    else if (expr.match(mathExprRules.MODULUS))
        expression.operator = operators.MODULUS;
    else throw (error.INVALID_EXPRESSION)

    const tokensArray = expr.split(expression.operator);

    if (tokensArray[0].includes(' '))
        expression.left = tokensArray[0].replaceAll(' ', '');
    else expression.left = tokensArray[0];

    if (tokensArray[1].includes(' '))
        expression.right = tokensArray[1].replaceAll(' ', '')
    else expression.right = tokensArray[1];

    console.log(expression);

    if (isNaN(expression.left))
        if (variables[expression.left]) {
            expression.left = variables[expression.left];
        } else if (constants[expression.left]) {
            expression.left = constants[expression.left];
        } else throw (error.VAR_DOES_NOT_EXIST);

    if (isNaN(expression.right))
        if (variables[expression.right]) {
            expression.right = variables[expression.right];
        } else if (constants[expression.right]) {
            expression.right = variables[expression.right];
        } else throw (error.VAR_DOES_NOT_EXIST);

    const parsedMathExpression = [];

    parsedMathExpression.push(expression.left);
    parsedMathExpression.push(expression.operator);
    parsedMathExpression.push(expression.right);

    return parsedMathExpression.join(' ');
}

const MathFunctions = {
    ABS: "ABS",
    BIN: "BIN",
    COS: "COS",
    HEX: "HEX",
    RAND: "RAND",
    ROUND: "ROUND",
    SIN: "SIN",
    SQRT: "SQRT",
    TG: "TG"
}

const NumericBases = {
    BI: 2,
    HX: 16
}

function handleMathFunction(mathFunction: string) {
    const tokens = mathFunction.split(' ');

    const math = {
        operation: tokens[1],
        destination: tokens[2],
        arg1: Number(tokens[3]),
        arg2: tokens[4] ? Number(tokens[4]) : undefined,
        result: undefined
    } as MathFunction;

    switch (math.operation) {
        case MathFunctions.ABS:
            math.result = Math.abs(math.arg1);
            break;
        case MathFunctions.BIN:
            math.result = math.arg1.toString(NumericBases.BI)
            break;
        case MathFunctions.COS:
            math.result = Math.cos(math.arg1);
            break;
        case MathFunctions.HEX:
            math.result = (math.arg1.toString(NumericBases.HX)).toUpperCase();
            break;
        case MathFunctions.RAND:
            if (math.arg2 === undefined) throw (error.MISSING_PARAMS);
            math.result = Math.random() * (math.arg2! - math.arg1) + math.arg1;
            break;
        case MathFunctions.ROUND:
            math.result = Math.floor(math.arg1)
            break;
        case MathFunctions.SIN:
            math.result = Math.sin(math.arg1);
            break;
        case MathFunctions.SQRT:
            math.result = Math.sqrt(math.arg1);
            break;
        case MathFunctions.TG:
            math.result = Math.tan(math.arg1);
            break;
        default:
            throw ("invalid syntax in the math function");
    }

    saveInBinding(math.destination, math.result);
}

const logicExprRules = {
    EQUAL: /.*[0-9] == .*[0-9]/,
    EQUAL_ALTERNATIVE: /.*[0-9] IS .*[0-9]/,
    NOT_EQUAL: /.*[0-9] != .*[0-9]/,
    GREATER_THAN: /.*[0-9] > .*[0-9]/,
    LESS_THAN: /.*[0-9] < .*[0-9]/,
    GREATER_OR_EQUAL: /.*[0-9] >= .*[0-9]/,
    LESS_OR_EQUAL: /.*[0-9] <= .*[0-9]/,
};

function checkIfIsLogicExpr(expr: string): boolean {
    if (expr.match(logicExprRules.EQUAL)) return true;
    if (expr.match(logicExprRules.EQUAL_ALTERNATIVE)) return true;
    if (expr.match(logicExprRules.NOT_EQUAL)) return true;
    if (expr.match(logicExprRules.GREATER_THAN)) return true;
    if (expr.match(logicExprRules.GREATER_OR_EQUAL)) return true;
    if (expr.match(logicExprRules.LESS_THAN)) return true;
    if (expr.match(logicExprRules.LESS_OR_EQUAL)) return true;
    return false;
}

class TitaniumArray {
    arrayElement: TitaniumArrayStructure = {
        name: "",
        data: [],
        length: 0,
    };

    checkIfArrayExists(identifier: string) {
        if (arrays[identifier] != undefined) return true;

        return false;
    }

    createArray(statement) {
        const name = statement[0];
        const content = statement[1];

        this.arrayElement.name = name.replaceAll(" ");

        let arrayDataParsed = content
            .replace(operators.ARRAY_START, "")
            .replace(operators.ARRAY_END, "");

        if (arrayDataParsed.includes(", "))
            arrayDataParsed = arrayDataParsed.split(
                operators.ARRAY_ELEMENT_SEPARATOR + " "
            );
        else
            arrayDataParsed = arrayDataParsed.split(
                operators.ARRAY_ELEMENT_SEPARATOR
            );

        this.arrayElement.length = arrayDataParsed.length;
        this.arrayElement.data = arrayDataParsed;

        if (!arrays[this.arrayElement.name])
            arrays[this.arrayElement.name] = this.arrayElement.data;
        else throw error.CANNOT_MODIFY_ARRY;
    }

    retrieveElement(statement) {
        const arrayData = {
            name: statement[0],
            index: statement[1]
        }

        if (!arrays[arrayData.name])
            throw (`${arrayData.name} doesn't exist or is accessed before its declaration`);

        const array = arrays[arrayData.name];
        const length = array.length

        switch (arrayData.index) {
            case keywords.ARRAY_LENGTH:
                return length;
                break;
            case keywords.ARRAY_LENGTH_ALT:
                return length;
                break;
            default:
                if (isNaN(arrayData.index))
                    arrayData.index = searchInVariablesAndConstants(arrayData.index);

                if (arrayData.index > (length - 1))
                    throw (`the index ${arrayData.index} doesn't exist in ${arrayData.name}`);

                return (arrays[arrayData.name][arrayData.index])
                break;
        }
    }
}

function handleCreateNewArray(declaration: string) {
    const array = new TitaniumArray();
    const arrayStatement: string[] = declaration
        .replace(keywords.ARRAY, "")
        .split(" = ");

    array.createArray(arrayStatement);
}

function handleRetrieveElementFromArray(statement: string) {
    const array = new TitaniumArray();
    const arrayRetrieveElementStatement = statement.replace(
        operators.ARRAY_END,
        ""
    ).split('[');

    return array.retrieveElement(arrayRetrieveElementStatement);
}


function checkIfIsArrayRetrieveElementStatement(statement: string): boolean {
    if (statement.match(arrayRetrieveElement)) return true;
    return false;
}

function parseBoolean(value) {
    if (value == keywords.BOOL_TRUE || value == keywords.BOOL_YES) return true;

    if (value == keywords.BOOL_FALSE || value == keywords.BOOL_NO) return false;
}

function checkIfIsBoolean(value): boolean {
    if (
        value.includes(keywords.BOOL_TRUE) ||
        value.includes(keywords.BOOL_FALSE) ||
        value.includes(keywords.BOOL_YES) ||
        value.includes(keywords.BOOL_NO)
    )
        return true;

    return false;
}


function checkIfIsNull(value): boolean {
    if (value.includes(types.NULL)) return true;
    return false;
}

function checkIfIsUndefined(value): boolean {
    if (value.includes(types.UNDEFINED)) return true;
    return false;
}

function parseNullValue(value) {
    switch (value) {
        case types.NULL:
            return "NULL";
            break;
        case types.UNDEFINED:
            return "UNDEFINED";
            break;
        default:
            break;
    }
}

function handleRepeatStatement(statement: string): void {
    let tokens = statement.split(',');
    tokens[0] = tokens[0].replace(keywords.REPEAT, "").trim();

    //tokens[0] = the number of iterations
    //tokens[1] = command to be executed

    let iteration = 0;

    if(!isNaN(tokens[0])){
        if(tokens[1]){
            while(iteration < tokens[0]){
                parseLine(tokens[1].trim());
                iteration++;
            }

            return;
        } else {
            throw("the second argument must not be empty");
        }
    }

    throw(error.NOT_NUMBER);
}

function checkIfIsNumber(value): boolean {
    if (!isNaN(value)) return true;

    return false;
}

function mainLoop() {
    const command = defaultUserInput("👻: ");

    if (command.match(/titanium .*[A-Za-z_]\.t/)) {
        const filename = command.replace("titanium ", "");
        var file = require('fs');

        file.readFile(filename, 'utf-8', (err, data) => {
            if (!err)
                parseCode(data);
            else throw ("file not found or not a valid Titanium source file");
        })

        isRunning = false;
    }

    parseLine(command);
}

console.log("Welcome to 🛠️ Andrew Toolchain, Titanium's official CLI interpreter written in TypeScript.");
console.log("Before you continue, I'd like to thank my friends Gustavo Nogueira, Gustavo A. Tilpe, and Matheus do Espírito Santo for all the motivation and support with this project. ❤️");
console.log("Please visit Titanium's official repo here: https://github.com/Redwars22/Titanium");

while (isRunning) {
    mainLoop();
}
