const info = {
	text: "Titanium is an experimental fictional programming language developed by " +
		"the fictional characters Matheus, Gustavo N, and Léo Andrew. \n" +
		"This playground built in JS is still in its very early development stages " +
		"and as such still doesn't recognize most of Titanium's commands and instructions",
	help: "<h4>Here's what you can do already: </h4>" +
		"<left><ol><li>Create variables and assign them values</li>" +
		"<li>Get input from the user and store it in a variable</li>" +
		"<li>Clear the console with the clear() command</li>" +
		"<li>Change the value of a variable</li></ol></left>"
}

window.onload = () => {
	Swal.fire({
		title: "Welcome to Titanium's Playground",
		text: info.text,
		icon: 'info',
		confirmButtonText: 'Ok, got it!'
	})
}

function showHelp(){
	Swal.fire({
		title: '',
		html: info.help,
		icon: 'info',
		confirmButtonText: 'I understand!'
	});
}

function runCode(){
  const command = document.querySelector('.command-input').value;
  document.querySelector('.command-input').value = "";
  if(command) parseLine(command);
}