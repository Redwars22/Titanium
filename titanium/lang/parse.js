function parse(command){
  try {
    if(command.match(printCommand) || command.match(printCommandShorter)){
      printFunction(command);
    } else {
      throw("TITANIUM: Invalid token and/or character found!")
    }
  } catch(err) {
    document.getElementById('console').innerText += err + "\n$ _";
  }
}

function run(){
  const command = document.querySelector('.command-input').value;
  if(command) parse(command);
}