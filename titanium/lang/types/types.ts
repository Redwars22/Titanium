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

const types = {
	STRING: 'string',
	BOOL: 'bool',
	NUMBER: 'num'
}

function checkIfIsString(value): boolean {
	if(value.includes("\""))
		return true;
	
	return false
}

function checkIfIsBoolean(value): boolean {
	if(value.includes(keywords.BOOL_TRUE) || value.includes(keywords.BOOL_FALSE))
		return true;
	
	return false;
}

function checkIfIsNumber(value): boolean {
	if(!isNaN(value))
		return true;
	
	return false;
}

function checkType(value): string {
	if(checkIfIsString(value)) return types.STRING;
	if(checkIfIsBoolean(value)) return types.BOOL;
	if(checkIfIsNumber(value)) return types.NUMBER;
}

function parseBoolean(value){
	if(value == keywords.BOOL_TRUE)
		return true
	
	if(value == keywords.BOOL_FALSE)
		return false;
}