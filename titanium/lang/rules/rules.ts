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

const arrayDeclaration = /ARR .*[A-Za-z_] = \[.*[0-9A-Za-z_"!@]\]/gm;
const arrayRetrieveElement = /.*[A-Za-z_]\[.*[0-9A-Za-z_]\]/gm;
const blockStatement = /.*[A-Za-z_]:/g;
const callProcedureStatement = /CALL .*[A-Za-z_]/gm;
const clearConsoleCommand = /clear\(\)/g;
const constantDeclaration = /DEF .*[A-Za-z_] = "?.*[A-Za-z0-9\(\)]?"?/;
const decrementStatement = /DEC .*[A-Za-z_]/;
const deleteStatement = /DEL .*[A-Za-z_]/;
const forStatement = /FOR .* =>/;
const ifStatement = /IF .* =>/;
const incrementStatement = /INC .*[A-Za-z_]/;
const mathCommand = /MATH .*[A-Za-z0-9\[\]_ ]/;
const printCommand = /print\("?.*[\[\]0-9A-Z a-z!,_ ?:><=!]?"?\)/g;
const printLineCommand = /printLine()/gm;
const procedureDeclaration = /PROC .*[A-Za-z_] =>/gm;
const repeatCommand = /REP .*[0-9]( )?,( )?.*/g;
const returnStatement = /(RET) (.*[0-9A-Za-z])?/gm;
const scanfCommand = /get\(.*[A-Za-z_\[\]]\)/gi;
const sleepStatement = /SLEEP .*[0-9]/g;
const singleLineComment = /--.*[A-Za-z0-9_ ]/gi;
const ternaryStatementRule = /.*["A-Za-z ><=!] ? .*["A-Z0-9a-z] : .*["A-Z0-9a-z]/gm; 
const variableAssignment = /.*[A-Za-z_] = "?.*[A-Za-z0-9 ?:><=!\(\)]"?/gi;
const variableDeclaration = /DECL .*[A-Za-z_] = "?.*[A-Za-z0-9\+]?"?/gm;