function parseLine(command) {
  try {
    /* -------------------------- COMMENTS -------------------------- */
    if (command.match(singleLineComment)) {
      return;
    }

    /* -------------------------- INPUT AND OUTPUT -------------------------- */
    if (command.match(printCommand) || command.match(printCommandShorter)) {
      printFunction(command);
      return;
    }

    if (command.match(printCommandWithVariable)) {
      printValueFromVariable(command);
      return;
    }

    if (command.match(clearConsoleCommand)) {
      clearConsole();
      return;
    }

    if (command.match(scanfCommand)) {
      scanfFunction(command);
      return;
    }

    /* -------------------------- VARIABLES AND DATA TYPES -------------------------- */
    if (command.match(variableDeclaration)) {
      createVariable(command);
      return;
    }

    if (command.match(variableAssignment)) {
      assignToVariable(command);
      return;
    }

    throw "❌️ TITANIUM: Invalid token and/or character found or the command is not a valid Titanium keyword!";
  } catch (err) {
    document.getElementById("console").innerText += err + "\n";
    hasThrownAnError = true;
  }
}

function parseCode(code) {
  const linesOfCodeArray = code.split("\n");
  let currentLine = 0;
  let hasThrownAnError = false;

  try {
    while (currentLine < linesOfCodeArray.length && !hasThrownAnError) {
      if (linesOfCodeArray[currentLine].includes("EXIT")) {
        throw "⚠️ TITANIUM: the program has exited";
      }

      if (linesOfCodeArray[currentLine] != "") {
        parseLine(linesOfCodeArray[currentLine]);
      }

      if(hasThrownAnError) break;
      
      currentLine++;
    }
  } catch (err) {
    document.getElementById("console").innerText += err + "\n";
  }
}
