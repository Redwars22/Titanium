function checkIfIsString(value){
	if(value.includes("\""))
		return true;
	
	return false
}

function checkIfIsBoolean(value){
	if(value.includes("TRUE") || value.includes("FALSE"))
		return true;
	
	return false;
}

function checkType(value){
	if(checkIfIsString(value)) return 'string';
	if(checkIfIsBoolean(value)) return 'bool';
}

