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
var error = {
    VAR_DOES_NOT_EXIST: "the variable/constant you tried to access doesn't exist",
    INVALID_EXPRESSION: "the expression is invalid or the variable doesn't exist",
    FUNCTION_MISSING_ARG: "one or more of the required the arguments of the function is missing",
    RANDOM_INVALID_PARAM: "invalid parameters to the random() function. Both parameters should be of type number",
    UNKNOWN_TYPE: "Titanium couldn't guess the type automatically. Are you sure you used one of the supported types?",
    CANNOT_MODIFY_ARRY: "You cannot modify or redeclare an array that already exists",
    MISSING_PARAMS: "one or more of the required parameters is missing"
};
function throwError(err, line) {
    document.querySelector(".errors-log").innerText += "\n\u274C\uFE0F Line: ".concat(line + 1, " - ").concat(err, " \n");
}
function throwWarning(msg) {
    document.querySelector(".errors-log").innerText += "\n\u26A0\uFE0F ".concat(msg, " \n");
}
