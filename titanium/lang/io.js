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
    throw("TITANIUM: Missing ) token at the end of the line")
  }
}

function printValueFromVariable(command){

}