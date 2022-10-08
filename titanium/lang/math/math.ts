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

const mathExprRules = {
  ADD: /.*[0-9 ]\+.*[0-9 ]/g,
  SUBTRACT: /.*[0-9 ]\-.*[0-9 ]/g,
  MULTIPLY: /.*[0-9 ]\*.*[0-9 ]/g,
  MODULUS: /.*[0-9 ]\%.*[0-9 ]/g,
  DIVISION: /.*[0-9 ]\/.*[0-9 ]/g,
};

function checkIfIsMathExpr(expr): boolean {
  if (expr.match(mathExprRules.ADD)) return true;

  if (expr.match(mathExprRules.SUBTRACT)) return true;

  if (expr.match(mathExprRules.DIVISION)) return true;

  if (expr.match(mathExprRules.MULTIPLY)) return true;

  if (expr.match(mathExprRules.MODULUS)) return true;

  return false;
}

function parseMathExpression(expr) {
  const expression: MathExpression = {
    left: 0,
    operator: "",
    right: 0
  };

  if (expr.match(mathExprRules.ADD))
    expression.operator = operators.ADD;
  else if (expr.match(mathExprRules.SUBTRACT))
    expression.operator = operators.SUBTRACT;
  else if (expr.match(mathExprRules.DIVISION))
    expression.operator = operators.DIVIDE;
  else if (expr.match(mathExprRules.MULTIPLY))
    expression.operator = operators.MULTIPLY;
  else if (expr.match(mathExprRules.MODULUS))
    expression.operator = operators.MODULUS;
  else throw (error.INVALID_EXPRESSION)

  const tokensArray = expr.split(expression.operator);

  if (tokensArray[0].includes(' '))
    expression.left = tokensArray[0].replaceAll(' ', '');
  else expression.left = tokensArray[0];

  if (tokensArray[1].includes(' '))
    expression.right = tokensArray[1].replaceAll(' ', '')
  else expression.right = tokensArray[1];

  console.log(expression);

  if (isNaN(expression.left))
    if (variables[expression.left]) {
      expression.left = variables[expression.left];
    } else if (constants[expression.left]) {
      expression.left = constants[expression.left];
    } else throw (error.VAR_DOES_NOT_EXIST);

  if (isNaN(expression.right))
    if (variables[expression.right]) {
      expression.right = variables[expression.right];
    } else if (constants[expression.right]) {
      expression.right = variables[expression.right];
    } else throw (error.VAR_DOES_NOT_EXIST);

  const parsedMathExpression = [];

  parsedMathExpression.push(expression.left);
  parsedMathExpression.push(expression.operator);
  parsedMathExpression.push(expression.right);

  return parsedMathExpression.join(' ');
}

const MathFunctions = {
  ABS: "ABS",
  BIN: "BIN",
  COS: "COS",
  HEX: "HEX",
  RAND: "RAND",
  ROUND: "ROUND",
  SIN: "SIN",
  SQRT: "SQRT",
  TG: "TG"
}

const NumericBases = {
  BI: 2,
  HX: 16
}

function handleMathFunction(mathFunction: string) {
  const tokens = mathFunction.split(' ');

  const math = {
    operation: tokens[1],
    destination: tokens[2],
    arg1: Number(tokens[3]),
    arg2: tokens[4] ? Number(tokens[4]) : undefined,
    result: undefined
  } as MathFunction;

  switch (math.operation) {
    case MathFunctions.ABS:
      math.result = Math.abs(math.arg1);
      break;
    case MathFunctions.BIN:
      math.result = math.arg1.toString(NumericBases.BI)
      break;
    case MathFunctions.COS:
      math.result = Math.cos(math.arg1);
      break;
    case MathFunctions.HEX:
      math.result = (math.arg1.toString(NumericBases.HX)).toUpperCase();
      break;
    case MathFunctions.RAND:
      if (math.arg2 === undefined) throw (error.MISSING_PARAMS);
      math.result = Math.random() * (math.arg2! - math.arg1) + math.arg1;
      break;
    case MathFunctions.ROUND:
      math.result = Math.floor(math.arg1)
      break;
    case MathFunctions.SIN:
      math.result = Math.sin(math.arg1);
      break;
    case MathFunctions.SQRT:
      math.result = Math.sqrt(math.arg1);
      break;
    case MathFunctions.TG:
      math.result = Math.tan(math.arg1);
      break;
    default:
      throw ("invalid syntax in the math function");
  }

  saveInBinding(math.destination, math.result);
}