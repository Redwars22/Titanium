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

class TitaniumArray {
  arrayElement: TitaniumArrayStructure = {
    name: "",
    data: [],
    length: 0,
  };

  createArray(statement) {
    const name = statement[0];
    const content = statement[1];

    this.arrayElement.name = name.replaceAll(" ");

    let arrayDataParsed = content
      .replace(operators.ARRAY_START, "")
      .replace(operators.ARRAY_END, "");

    if (arrayDataParsed.includes(", "))
      arrayDataParsed = arrayDataParsed.split(
        operators.ARRAY_ELEMENT_SEPARATOR + " "
      );
    else
      arrayDataParsed = arrayDataParsed.split(
        operators.ARRAY_ELEMENT_SEPARATOR
      );

    this.arrayElement.length = arrayDataParsed.length;
    this.arrayElement.data = arrayDataParsed;

    if (!arrays[this.arrayElement.name])
      arrays[this.arrayElement.name] = this.arrayElement.data;
    else throw error.CANNOT_MODIFY_ARRY;
  }

  retrieveElement(statement) {
    return null;
  }
}

function handleCreateNewArray(declaration: string) {
  const array = new TitaniumArray();
  const arrayStatement: string[] = declaration
    .replace(keywords.ARRAY, "")
    .split(" = ");

  array.createArray(arrayStatement);
}

function handleRetrieveElementFromArray(){

}