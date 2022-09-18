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
var mathExprRules = {
    ADD: /.*[0-9 ]\+.*[0-9 ]/g,
    SUBTRACT: /.*[0-9 ]\-.*[0-9 ]/g,
    MULTIPLY: /.*[0-9 ]\*.*[0-9 ]/g,
    MODULUS: /.*[0-9 ]\%.*[0-9 ]/g,
    DIVISION: /.*[0-9 ]\/.*[0-9 ]/g,
};
var MathLibrary = {
    MATH_RANDOM: {
        keyword: "random",
        rule: /random\(.*[0-9],?( ).*[0-9]\,?( ).*[A-Za-z]\)/,
        function: function (min, max, shouldRound) {
            return shouldRound
                ? Math.round(Math.random() * (max - min) + min)
                : Math.random() * (max - min) + min;
        },
        parse: function (command) {
            var mathRandomFunction = command
                .replace(MathLibrary.MATH_RANDOM.keyword, "")
                .replace(operators.LEFT_PARENTHESIS, "")
                .replace(operators.RIGHT_PARENTHESIS, "")
                .replaceAll(' ', '')
                .split(",");
            var arg = mathRandomFunction;
            if (isNaN(arg[0]) || isNaN(arg[1]))
                throw error.RANDOM_INVALID_PARAM;
            if (!arg[2])
                throw error.FUNCTION_MISSING_ARG;
            return MathLibrary.MATH_RANDOM.function(Number(arg[0]), Number(arg[1]), parseBoolean(arg[2]));
        },
    },
};
function checkIfIsMathExpr(expr) {
    if (expr.match(mathExprRules.ADD))
        return true;
    if (expr.match(mathExprRules.SUBTRACT))
        return true;
    if (expr.match(mathExprRules.DIVISION))
        return true;
    if (expr.match(mathExprRules.MULTIPLY))
        return true;
    if (expr.match(mathExprRules.MODULUS))
        return true;
    return false;
}
function parseMathExpression(expr) {
    var expression = {
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
    else
        throw (error.INVALID_EXPRESSION);
    var tokensArray = expr.split(expression.operator);
    if (tokensArray[0].includes(' '))
        expression.left = tokensArray[0].replaceAll(' ', '');
    else
        expression.left = tokensArray[0];
    if (tokensArray[1].includes(' '))
        expression.right = tokensArray[1].replaceAll(' ', '');
    else
        expression.right = tokensArray[1];
    console.log(expression);
    if (isNaN(expression.left))
        if (variables[expression.left]) {
            expression.left = variables[expression.left];
        }
        else if (constants[expression.left]) {
            expression.left = constants[expression.left];
        }
        else
            throw (error.VAR_DOES_NOT_EXIST);
    if (isNaN(expression.right))
        if (variables[expression.right]) {
            expression.right = variables[expression.right];
        }
        else if (constants[expression.right]) {
            expression.right = variables[expression.right];
        }
        else
            throw (error.VAR_DOES_NOT_EXIST);
    var parsedMathExpression = [];
    parsedMathExpression.push(expression.left);
    parsedMathExpression.push(expression.operator);
    parsedMathExpression.push(expression.right);
    return parsedMathExpression.join(' ');
}
