let line = "out(\"Hikkk\")";
let text;

const printCommand = /out\(\"[A-Za-z0-9]+\"\)/g;

function parse(line: string){
  try {
    if(line.match(printCommand)){
      text = line;

      if(line.includes("(") && line.includes(")")){
        text = text.split("out(")
                    .join("")
                    .split(")")
                    .join("")
                    .split("\"")
                    .join("");
              console.log(text);
      } else {
        throw("TITANIUM: Missing ) token at the end of the line")
      }

    } else {
      throw("TITANIUM: Invalid token and/or character found!")
    }
  } catch(err) {
    console.error(err);
  }
}

parse(line);
