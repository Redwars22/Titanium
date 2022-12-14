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
var arrayDeclaration = /ARR .*[A-Za-z_] = \[.*[0-9A-Za-z_"!@]\]/gm;
var arrayRetrieveElement = /.*[A-Za-z_]\[.*[0-9A-Za-z_]\]/gm;
var blockStatement = /.*[A-Za-z_]:/g;
var callProcedureStatement = /CALL .*[A-Za-z_]/gm;
var clearConsoleCommand = /clear\(\)/g;
var constantDeclaration = /DEF .*[A-Za-z_] = "?.*[A-Za-z0-9\(\)]?"?/;
var decrementStatement = /DEC .*[A-Za-z_]/;
var deleteStatement = /DEL .*[A-Za-z_]/;
var forStatement = /FOR .* =>/;
var ifStatement = /IF .* =>/;
var incrementStatement = /INC .*[A-Za-z_]/;
var mathCommand = /MATH .*[A-Za-z0-9\[\]_ ]/;
var printCommand = /print\("?.*[\[\]0-9A-Z a-z!,_ ?:><=!]?"?\)/g;
var printLineCommand = /printLine()/gm;
var procedureDeclaration = /PROC .*[A-Za-z_] =>/gm;
var repeatCommand = /REP .*[0-9]( )?,( )?.*/g;
var returnStatement = /(RET) (.*[0-9A-Za-z])?/gm;
var scanfCommand = /get\(.*[A-Za-z_\[\]]\)/gi;
var sleepStatement = /SLEEP .*[0-9]/g;
var singleLineComment = /--.*[A-Za-z0-9_ ]/gi;
var ternaryStatementRule = /.*["A-Za-z ><=!] ? .*["A-Z0-9a-z] : .*["A-Z0-9a-z]/gm;
var variableAssignment = /.*[A-Za-z_] = "?.*[A-Za-z0-9 ?:><=!\(\)]"?/gi;
var variableDeclaration = /DECL .*[A-Za-z_] = "?.*[A-Za-z0-9\+]?"?/gm;
