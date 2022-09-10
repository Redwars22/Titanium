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
var logicExprRules = {
    EQUAL: /.*[0-9] == .*[0-9]/,
    EQUAL_ALTERNATIVE: /.*[0-9] IS .*[0-9]/,
    NOT_EQUAL: /.*[0-9] != .*[0-9]/,
    GREATER_THAN: /.*[0-9] > .*[0-9]/,
    LESS_THAN: /.*[0-9] < .*[0-9]/,
    GREATER_OR_EQUAL: /.*[0-9] >= .*[0-9]/,
    LESS_OR_EQUAL: /.*[0-9] <= .*[0-9]/,
};
function checkIfIsLogicExpr(expr) {
    if (expr.match(logicExprRules.EQUAL))
        return true;
    if (expr.match(logicExprRules.EQUAL_ALTERNATIVE))
        return true;
    if (expr.match(logicExprRules.NOT_EQUAL))
        return true;
    if (expr.match(logicExprRules.GREATER_THAN))
        return true;
    if (expr.match(logicExprRules.GREATER_OR_EQUAL))
        return true;
    if (expr.match(logicExprRules.LESS_THAN))
        return true;
    if (expr.match(logicExprRules.LESS_OR_EQUAL))
        return true;
    return false;
}
