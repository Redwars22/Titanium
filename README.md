# TITANIUM PROGRAMMING LANGUAGE

## I-INTRODUCTION

Titanium is a general-purpose fictional programming language designed specifically for one of my stories. It's been developed by the fictional characters Gustavo, Matheus and Léo Andrew. Since it's all fictional, there's no compiler for it, but you can develop one for it if you want. All the documentation about its grammar and syntax is here, you can use it as the basis for the compiller. Typologically, Titanium is a … dynamically typed programming language with a Python/Lua-like syntax. It was designed to be easy to write and remember and as such it has short keywords, inspired by Assembly's three letter keywords. Here's an example of what Titanium looks like:

```
START
    --This is a single line comment in Titanium
    Output("Hello, world!")
END
```

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

```
DECL name: STR = "Dylan"
DECL age: NUM = 18
DECL height: REAL = 1.75
DECL isOverEighteen: BOOLEAN = TRUE
DECL nickname: NULL = undefined
```

/* arithmetic operators and variables and constants */

## III-RESERVED KEYWORDS

All reserved keywords in Titanium are written with uppercase letters in order to clearly distinguish them from variable, classes and function names. You may not use any of the following words to name anything:

DECL DEF START END IF RET LOOP EXIT STR BOOL REAL NUM NULL ELIF ELSE THEN

/* update this list later with more keywords */

## IV-COMMENTS

There are two types of comments in Titanium: one line and multiline comments. Two dashes represent a one line comment whereas $$ represent multiline ones. Example:

```
--This is a single line comment

$$
This is a comment
that spans over
several lines
$$
```

## V-INPUT AND OUTPUT

Titanium, like many other programming languages, has built-in functions for writing to a console and getting user input from it.

```
--Writing to the console
output("Insert your name" )

--Getting user input
DECL name: STR
get(name)
output("Hello, ".name)
```

As you can see from the example above, you can concatenate variables using the dot operator. You can also interpolate variables inside strings by using the $ sign:

```
output("Hello, ${name}!")z
```

## VI-CONDITIONS

Conditions in Titanium work pretty much like in other programming languages. It uses three main keywords: IF, ELSE, ELIF, which translate to if, else, and else if respectively. The condition statement always ends with the THEN keyword. Example:

```
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
