const constantDeclaration = "";
const clearConsoleCommand = /clear\(\)/g;

const printCommandShorter = /out\(\".*[A-Za-z0-9]+\"\)/g;
const printCommand = /output\(\".*[A-Za-z0-9]+\"\)/g;
const printCommandWithVariable = /out?[put]\(.*[A-Za-z_]\)/gi

const variableDeclaration = /DECL .*[A-Za-z_] = "?.*[A-Za-z]"?/gm;
const variableAssignment = /.*[A-Za-z_] = "?.*[A-Za-z]"?/gi;

const singleLineComment = /--.*[A-Za-z0-9_ ]/gi;