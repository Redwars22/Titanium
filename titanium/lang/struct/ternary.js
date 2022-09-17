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
var Ternary = {
    condition: null,
    returnValueIfTrue: null,
    returnValueIfFalse: null,
};
var ConditionTokens = {
    left: null,
    right: null,
};
/**
 * @param condition - it takes the condition
 * @description - if the condition has a variable or a constant, then the function
 * replaces it with the actual value. If the variable/constant hasn't been declared
 * prior to being used, it then throws an error
 */
function parseCondition(condition) {
    var tokens = condition.split(' ');
    ConditionTokens.left = tokens[0];
    ConditionTokens.right = tokens[2];
    if (isNaN(ConditionTokens.left)) {
        if (variables[ConditionTokens.left])
            Ternary.condition =
                Ternary.condition.replace(ConditionTokens.left, Number(variables[ConditionTokens.left]));
        else if (constants[ConditionTokens.left])
            Ternary.condition =
                Ternary.condition.replace(ConditionTokens.left, Number(constants[ConditionTokens.left]));
        else
            throw (error.VAR_DOES_NOT_EXIST);
    }
    if (isNaN(ConditionTokens.right)) {
        if (variables[ConditionTokens.right])
            Ternary.condition =
                Ternary.condition.replace(ConditionTokens.right, Number(variables[ConditionTokens.right]));
        else if (constants[ConditionTokens.right])
            Ternary.condition =
                Ternary.condition.replace(ConditionTokens.right, Number(constants[ConditionTokens.right]));
        else
            throw (error.VAR_DOES_NOT_EXIST);
    }
}
function TernaryStatement(ternaryExpr) {
    var ternaryBlocks = ternaryExpr.split(' ' + operators.TERNARY_CONDITION + ' ');
    Ternary.condition = ternaryBlocks[0];
    var returnValues = ternaryBlocks.join('')
        .replace(Ternary.condition, '')
        .split(' ' + operators.TERNARY_IF_ELSE + ' ');
    Ternary.returnValueIfTrue = returnValues[0];
    Ternary.returnValueIfFalse = returnValues[1];
    parseCondition(Ternary.condition);
    switch (eval(Ternary.condition)) {
        case true:
            var typeOfReturnValue = checkType(Ternary.returnValueIfTrue);
            if (typeOfReturnValue == 'boolean')
                return parseBoolean(Ternary.returnValueIfTrue);
            return Ternary.returnValueIfTrue;
            break;
        case false:
            var typeOfFalseReturnValue = checkType(Ternary.returnValueIfFalse);
            if (typeOfReturnValue == 'boolean')
                return parseBoolean(Ternary.returnValueIfFalse);
            return Ternary.returnValueIfFalse;
            break;
        default:
            throw ("unknown error while trying to parse ternary expression");
            break;
    }
}
function checkIfIsTernaryExpression(expr) {
    try {
        if (expr.match(ternaryStatementRule))
            return true;
    }
    catch (err) {
        return false;
    }
    return false;
}
