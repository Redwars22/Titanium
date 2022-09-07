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

const clearConsoleCommand = /clear\(\)/g;
const constantDeclaration = /DEF .*[A-Za-z_] = "?.*[A-Za-z0-9]"?/;
const printCommand = /output\(\".*[A-Za-z0-9]+\"\)/g;
const printCommandShorter = /out\(\".*[A-Za-z0-9]+\"\)/g;
const printCommandWithVariable = /out?[put]\(.*[A-Za-z_0-9]\)/gi
const scanfCommand = /get\(.*[A-Za-z_]\)/gi;
const singleLineComment = /--.*[A-Za-z0-9_ ]/gi;
const variableAssignment = /.*[A-Za-z_] = "?.*[A-Za-z0-9]"?/gi;
const variableDeclaration = /DECL .*[A-Za-z_] = "?.*[A-Za-z0-9]"?/gm;