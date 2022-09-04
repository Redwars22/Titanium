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
			throw("❌️ TITANIUM: token = missing in variable declaration");
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
		throw(`❌️ TITANIUM: Cannot assign a value to "${variable}" because it either doesn't exist or is a constant. Are you trying to create a new variable?`)
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
		throw("TITANIUM: ❌️ Cannot assign a value to a variable that doesn't exist")
	}
}

function getValueFromVariable(variable){
	if(variables[variable]){
		return variables[variable]
	}

	return;
}