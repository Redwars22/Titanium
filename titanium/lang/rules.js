const constantDeclaration = "";
const printCommandShorter = /out\(\".*[A-Za-z0-9]+\"\)/g;
const printCommand = /output\(\".*[A-Za-z0-9]+\"\)/g;
const variableDeclaration = /DECL .*[A-Za-z_] = "?.*[A-Za-z]"?/gm;
const variableAssignment = /.*[A-Za-z_] = "?.*[A-Za-z]"?/gi;