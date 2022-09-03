function printFunction(text){
  if(text.includes("(") && text.includes(")")){
    if(text.includes("output")){
    	text = text.split("output(")
                .join("")
                .split(")")
                .join("")
                .split("\"")
                .join("");
    } else {
    	text = text.split("out(")
                .join("")
                .split(")")
                .join("")
                .split("\"")
                .join("");
    }
      	document.getElementById('console').innerText += "\n" + text;
  } else {
    throw("❌️ TITANIUM: Missing ) token at the end of the line")
  }
}

function printValueFromVariable(command){
  if(command.includes("out")) 
    command = command.replace("out", "");
  if(command.includes("output")) 
    command = command.replace("output", "");

  command = command.replace("(", "");
  command = command.replace(")", "");

  const variable = command;
  const value = getValueFromVariable(variable);

  if(value){
    document.getElementById('console').innerText += "\n" + value;
  } else {
    throw(`❌️ TITANIUM: variable "${variable}" either doesn't exist or hasn't been initialized yet!`);
  }
}

function clearConsole(){
  document.getElementById('console').innerText = "$ _";
}