# TITANIUM PROGRAMMING LANGUAGE

## I-INTRODUCTION

Titanium is a general-purpose fictional programming language designed specifically for one of my stories. It's been developed by the fictional characters Gustavo, Matheus and Léo Andrew. Since it's all fictional, there's no compiler for it, but you can develop one for it if you want. All the documentation about its grammar and syntax is here, you can use it as the basis for the compiller. Typologically, Titanium is a … dynamically typed programming language with a Python/Lua-like syntax. It was designed to be easy to write and remember and as such it has short keywords, inspired by Assembly's three letter keywords. Here's an example of what Titanium looks like:

```jsx
START
    --This is a single line comment in Titanium
    Output("Hello, world!")
END
```

---

## II-DATA TYPES

Titanium is mostly a dynamically typed programming language and types are optional, except for constants and arrays. It has five main data types:

| KEYWORD | DESCRIPTION |
| --- | --- |
| STR | Strings of text and characters  |
| NUM | Either positive or negative integer numbers |
| REAL | Float and double |
| BOOL | Boolean |
| NULL | Either null or undefined  |

Variables can be typed using the following syntax:

```jsx
DECL name: STR = "Dylan"
DECL age: NUM = 18
DECL height: REAL = 1.75
DECL isOverEighteen: BOOLEAN = TRUE
DECL nickname: NULL = UNDEF
```

Titanium has both variables and constants. The difference between them is that you can't change the value of a constant once it's been declared. You can declare a variable by using the DECL keyword, followed by the name of the variable, plus its type (which is optional in Titanium), and finally its value. A constant can be defined exactly in the same fashion, but using the DEF keyword instead. The arithmetic operators are + - * / = %, which should be familiar to you if you have learned another programming language before.

---

## III-RESERVED KEYWORDS

All reserved keywords in Titanium are written with uppercase letters in order to clearly distinguish them from variable, classes and function names. You may not use any of the following words to name anything:

> **BOOL DECL DEF ELIF ELSE END EXIT FALSE IF IS NULL NUM OR REAL RET START STR THEN TRUE UNDEF**
> 

---

## IV-COMMENTS

There are two types of comments in Titanium: one line and multiline comments. Two dashes represent a one line comment whereas $$ represent multiline ones. Example:

```jsx
--This is a single line comment

$$
This is a comment
that spans over
several lines
$$
```

---

## V-INPUT AND OUTPUT

Titanium, like many other programming languages, has built-in functions for writing to a console and getting user input from it.

```jsx
--Writing to the console
output("Insert your name" )

--Getting user input
DECL name: STR
get(name)
output("Hello, "..name)
```

As you can see from the example above, you can concatenate variables using the two dots operator. You can also interpolate variables inside strings by using the $ sign:

```jsx
output("Hello, ${name}!")z
```

---

## VI-CONDITIONS

Conditions in Titanium work pretty much like in other programming languages. It uses three main keywords: IF, ELSE, ELIF, which translate to if, else, and else if respectively. The condition statement always ends with the THEN keyword. Example:

```jsx
DECL isLogged: BOOL = FALSE

IF isLogged THEN
    output("Welcome back, ${username})
ELSE
    output("Please sign in to use this app!")
END
```

You can also do comparisons using the following logical and arithmetic operators:

Another way you can write expressions that return a value depending on a certain condition or criteria is by using ternary operators, which are also supported in Titanium. The syntax is: **CONDITION ? VALUE IT SHOULD RETURN IF TRUE : VALUE IT SHOULD RETURN IF FALSE.**

| OPERATOR  | MEANING | STATEMENT |
| --- | --- | --- |
| IS or == | equality  | isLogged IS TRUE, isLogged == TRUE |
| && | AND | isLogged && hasAccount |
| ! | Negation | !isLogged |
| OR | OR | isLogged OR hasAccount  |
| > | Larger than | 10 > 9 |
| < | Smaller than | 9 < 7 |
| ≥ | Larger than or equal to | 7 ≥ 1 |
| ≤ | Smaller than or equal to | 1 ≤ 7 |

```jsx
--This is valid in Titanium
IF age > 18 THEN
    RET "Adult"
ELSE RET "Minor"

--This is also valid in Titanium
DECL status: STR = (age > 18) ? "Adult" : "Minor"
```

---

## VII-CODEBLOCKS, FUNCTIONS AND STATEMENTS

Unlike languages with curly brace syntax like C or Java and languages that use indentation like Python, Titanium marks the end of a block of code with the END keyword. Also, it doesn't require you to end statements with a semicolon, unlike C and Java. The syntax of the Titanium language was meant to be as clear as possible.

Functions in Titanium are very easy to declare and use: You should use the DEF keyword, the same used for declaring constants, give them a name and then, optionally, pass arguments and parameters to them. Although they can return a value, like in other programming languages, not all of them are required to do so. If they do, you can return it with the RET keyword. An empty RET is used when you want to stop executing the function and go back. There’s also another keyword very similar to RET, which is EXIT, but this one ends the execution of the program, whereas RET simply gets out of the function. Example:

```tsx
--This is a simple function that takes two numbers and returns their sum
DEF sumTwoNumbers():
	RET x + y
END

output(sumTwoNumbers(2, 5))

--This is a simple function that takes no arguments
DEF getUsername():
	RET username
END
```

Alternatively, you can write functions that just return a value by using a shorthand:

```tsx
--Takes two numbers and returns their sum
DEF sumTwoNumbers(2, 5) => 2 + 5

output(sumTwoNumbers(2, 5))
```

Furthermore, if a function doesn’t take any arguments, the parenthesis should be left out:

```tsx
--Returns the username
DEF getUsername => username

output("Hello, "..getUsername().."!")
```

---

For more advanced topics, such as loops, modules, libraries and arrays, please read the ADVANCED TOPICS documentation. And, for even more advanced topics, you can read the OBJECT ORIENTED TITANIUM documentation.
