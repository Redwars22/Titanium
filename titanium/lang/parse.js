function parse(command){
  try {
    /*COMMENTS*/
    if(command.match(singleLineComment)){
      return;
    }

    /*INPUT AND OUTPUT*/
    if(command.match(printCommand) || command.match(printCommandShorter)){
      printFunction(command);
      return;
    }

    if(command.match(printCommandWithVariable)){
      printValueFromVariable(command);
      return;
    }

    if(command.match(clearConsoleCommand)){
      clearConsole();
      return;
    }

    /*VARIABLES AND DATA TYPES*/
    if(command.match(variableDeclaration)){
      createVariable(command);
      return;
    }

    if(command.match(variableAssignment)){
      assignToVariable(command);
      return;
    }

    throw("❌️ TITANIUM: Invalid token and/or character found or the command is not a valid Titanium keyword!")
  } catch(err) {
    document.getElementById('console').innerText += err + "\n$ _";
  }
}

function run(){
  const command = document.querySelector('.command-input').value;
  if(command) parse(command);
}