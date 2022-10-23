# This is Titanium to JavaScript transpiller - codename Athena
# It was written by André Pereira (AndrewNation) for converting
# Titanium code to JavaScript. It's the script used in Gusleothew
# playground and the Andrew Toolchain interpreter.

JavaScriptOutput = []
code = []

rules = {
    constantDeclaration: /DEF .*[A-Za-z_] = "?.*[A-Za-z0-9\(\)]?"?/
    printCommand: /print\("?.*[\[\]0-9A-Z a-z!,_ ?:><=!]?"?\)/g
    variableDeclaration: /DECL .*[A-Za-z_] = "?.*[A-Za-z0-9\+]?"?/gm
}

titanium = {
    constKeyword: "DEF"
    printKeyword: "print("
    varKeyword: "DECL"
}

javascript = {
    constKeyword: "const"
    printKeyword: "console.log("
    varKeyword: "let"
}

parseVariables = (statement) ->
    return statement.replace(titanium.varKeyword, javascript.varKeyword)

parsePrint = (statement) ->
    return statement.replace(titanium.printKeyword, javascript.printKeyword)

parseConstants = (statement) ->
    return statement.replace(titanium.constKeyword, javascript.constKeyword)

parseTitaniumLine = (line) ->
    if line.match(rules.constantDeclaration)
        return parseConstants(line)
    
    if line.match(rules.variableDeclaration)
        return parseVariables(line)
    
    if line.match(rules.printCommand)
        return parsePrint(line)
    
    #window.alert "[error] issues have been found in your Titanium code. Please verify it with Titanium CLI or Gusleothew playground"

parseTitaniumToJavaScript = (code) ->
    for line in code
        JavaScriptOutput.push parseTitaniumLine(line)

convertTitanium_To_JS = (code) ->
    parseTitaniumToJavaScript(code)
    JSoutput = ""

    for code_line in JavaScriptOutput
        if code_line != undefined
            code_line = code_line.trim
            JSoutput += code_line

    output = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top="+(screen.height-400)+",left="+(screen.width-840));
    output.document.body.innerHTML = "<pre>" + JavaScriptOutput + "</pre>";