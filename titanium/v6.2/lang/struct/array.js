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
var TitaniumArray = /** @class */ (function () {
    function TitaniumArray() {
        this.arrayElement = {
            name: "",
            data: [],
            length: 0,
        };
    }
    TitaniumArray.prototype.checkIfArrayExists = function (identifier) {
        if (arrays[identifier] != undefined)
            return true;
        return false;
    };
    TitaniumArray.prototype.createArray = function (statement) {
        var name = statement[0];
        var content = statement[1];
        this.arrayElement.name = name.replaceAll(" ");
        var arrayDataParsed = content
            .replace(operators.ARRAY_START, "")
            .replace(operators.ARRAY_END, "");
        if (arrayDataParsed.includes(", "))
            arrayDataParsed = arrayDataParsed.split(operators.ARRAY_ELEMENT_SEPARATOR + " ");
        else
            arrayDataParsed = arrayDataParsed.split(operators.ARRAY_ELEMENT_SEPARATOR);
        this.arrayElement.length = arrayDataParsed.length;
        this.arrayElement.data = arrayDataParsed;
        if (!arrays[this.arrayElement.name])
            arrays[this.arrayElement.name] = this.arrayElement.data;
        else
            throw error.CANNOT_MODIFY_ARRY;
    };
    TitaniumArray.prototype.retrieveElement = function (statement) {
        var arrayData = {
            name: statement[0],
            index: statement[1]
        };
        if (!arrays[arrayData.name])
            throw ("".concat(arrayData.name, " doesn't exist or is accessed before its declaration"));
        var array = arrays[arrayData.name];
        var length = array.length;
        switch (arrayData.index) {
            case keywords.ARRAY_LENGTH:
                return length;
                break;
            case keywords.ARRAY_LENGTH_ALT:
                return length;
                break;
            default:
                if (isNaN(arrayData.index))
                    arrayData.index = searchInVariablesAndConstants(arrayData.index);
                if (arrayData.index > (length - 1))
                    throw ("the index ".concat(arrayData.index, " doesn't exist in ").concat(arrayData.name));
                return (arrays[arrayData.name][arrayData.index]);
                break;
        }
    };
    return TitaniumArray;
}());
function handleCreateNewArray(declaration) {
    var array = new TitaniumArray();
    var arrayStatement = declaration
        .replace(keywords.ARRAY, "")
        .split(" = ");
    array.createArray(arrayStatement);
}
function handleRetrieveElementFromArray(statement) {
    var array = new TitaniumArray();
    var arrayRetrieveElementStatement = statement.replace(operators.ARRAY_END, "").split('[');
    return array.retrieveElement(arrayRetrieveElementStatement);
}
