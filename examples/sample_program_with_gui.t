--Dinosaur is Titanium's official GUI library
IMP dinosaur AS gui

--The drawWindow function receives four parameters: the width, the height, the title and, optionally, the icon

gui.drawWindow(480, 480, "Sample Window", "icon.ico")
gui.window.SET.background("#abc")

$$
The function that draws a button accepts several parameters:
the x position, the y position, the width, the height, the text, and another function, which is
the event that will be fired when the user clicks the button
$$

DECL clicks = 0

gui.drawButton(
	0,
	0, 
	150,
	50,
	"Click Me",
	DECL clickEvent():
		clicks++
		gui.showAlert("You clicked me"..clicks.."times!")
	END
)

output("The window has been rendered!")