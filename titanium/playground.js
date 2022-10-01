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
var info = {
    text: "Titanium is an experimental fictional programming language developed by " +
        "the fictional characters Matheus, Gustavo N, and Léo Andrew. \n" +
        "This playground built in JS is still in its very early development stages " +
        "and as such still doesn't recognize most of Titanium's commands and instructions",
    help: "<h4>Here's what you can do already: </h4>" +
        "<left><ol><li>Create variables and assign them values AND create constants</li>" +
        "<li>Get input from the user and store it in a variable</li>" +
        "<li>Clear the console with the clear() command</li>" +
        "<li>Change the value of a variable</li>" +
        "<li>Printing simple math expressions, such as 2 + 2 or 9 % 2</li>" +
        "<li>Support for String (without special symbols such as ! @ ?), Boolean and Number</li></ol></left>",
};
window.onload = function () {
    Swal.fire({
        title: "Welcome to Titanium's Playground",
        text: info.text,
        icon: "info",
        confirmButtonText: "Ok, got it!",
    });
    if (localStorage.getItem("autosave"))
        document.querySelector("#code-area").innerText =
            localStorage.getItem("autosave");
    else
        document.querySelector("#code-area").innerText =
            'DECL msg = "Hello World!"\nprint(msg)\nEXIT';
    setInterval(function () { return localStorage.setItem('autosave', document.querySelector("#code-area").innerText); }, 1500);
};
function showHelp() {
    Swal.fire({
        title: "",
        html: info.help,
        icon: "info",
        confirmButtonText: "I understand!",
    });
}
function runCode() {
    var code = document.querySelector("#code-area").innerText;
    constants = {};
    variables = {};
    arrays = {};
    iterations;
    if (code)
        parseCode(code);
}
function clearCode() {
    document.querySelector("#console").innerText = "";
}
