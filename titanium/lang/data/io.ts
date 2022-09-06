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

//@ts-check

function clearConsole(){
  document.getElementById('console')!.innerText = "$ _";
}

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
      	document.getElementById('console')!.innerText += "\n" + text;
  } else {
    throw("Missing ) token at the end of the line")
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
    document.getElementById('console')!.innerText += "\n" + value;
  } else {
    throw(`variable "${variable}" either doesn't exist or hasn't been initialized yet!`);
  }
}

function scanfFunction(command){
  command = command.replace("get", "");
  command = command.replace("(", "");
  command = command.replace(")", "");

  const variable = command;
  assignToVariableFromScanf(variable);
}