const clearConsoleCommand = /clear\(\)/g;
const constantDeclaration = "";
const printCommand = /output\(\".*[A-Za-z0-9]+\"\)/g;
const printCommandShorter = /out\(\".*[A-Za-z0-9]+\"\)/g;
const printCommandWithVariable = /out?[put]\(.*[A-Za-z_]\)/gi
const scanfCommand = /get\(.*[A-Za-z_]\)/gi;
const singleLineComment = /--.*[A-Za-z0-9_ ]/gi;
const variableAssignment = /.*[A-Za-z_] = "?.*[A-Za-z]"?/gi;
const variableDeclaration = /DECL .*[A-Za-z_] = "?.*[A-Za-z]"?/gm;