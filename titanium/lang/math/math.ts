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

const MathLibrary = {
  MATH_RANDOM: {
    keyword: "random",
    rule: /random\(.*[0-9],?( ).*[0-9]\,?( ).*[A-Za-z]\)/,
    function: (min: number, max: number, shouldRound: boolean) =>
      shouldRound
        ? Math.round(Math.random() * (max - min) + min)
        : Math.random() * (max - min) + min,
    parse: (command) => {
      const mathRandomFunction = command
        .replace(MathLibrary.MATH_RANDOM.keyword, "")
        .replace(operators.LEFT_PARENTHESIS, "")
        .replace(operators.RIGHT_PARENTHESIS, "")
        .replaceAll(' ', '')
        .split(",");
      const arg = mathRandomFunction;
      if (isNaN(arg[0]) || isNaN(arg[1])) throw error.RANDOM_INVALID_PARAM;

      if (!arg[2]) throw error.FUNCTION_MISSING_ARG;

      return MathLibrary.MATH_RANDOM.function(
        Number(arg[0]),
        Number(arg[1]),
        parseBoolean(arg[2])
      );
    },
  },
};
