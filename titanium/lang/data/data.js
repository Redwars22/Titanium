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

const variables = {};
const constants = {};

function createVariable(command){
	const keyword = "DECL ";

	if(command.includes(keyword)){
		command = command.replace(keyword, "");
		command = command.split(' ');

		const type = checkType(command[2]);

		if(command[1] == "="){
			if(type == 'string'){
				command[2] = command[2].replaceAll("\"", "");
				variables[command[0]] = command[2];
			}

			if(type == 'bool'){
				if(command[2] == 'TRUE') variables[command[0]] = true;
				if(command[2] == 'FALSE') variables[command[0]] = false;
			}

			console.log(variables);
		} else {
			throw("token = missing in variable declaration");
		}
	}
}

function assignToVariable(command){
	command = command.split(' ');
	let variable, value;

	if(command[1] == "="){
		variable = command[0];
		command[2] = command[2].replaceAll("\"", "");
		value = command[2];
	} else {
		throw("TITANIUM: token = expected");
	}

	if(variables[variable]){
		variables[variable] = value;
		console.log(variables);
	} else {
		throw(`Cannot assign a value to "${variable}" because it either doesn't exist or is a constant. Are you trying to create a new variable?`)
	}
}

function assignToVariableFromScanf(variable, value){
	if(variables[variable]){
		const value = window.prompt(`Assign a value to "${variable}"`);

		if(checkIfIsBoolean(value)){
			variables[variable] = parseBoolean(value);
		} else {
			variables[variable] = value;
		}
		
	} else {
		throw("Cannot assign a value to a variable that doesn't exist")
	}
}

function getValueFromVariable(variable){
	if(variables[variable]){
		return variables[variable]
	}

	return;
}