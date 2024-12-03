/* Handles resizing or updating the application's layout to fit the screen better */
function updateLayout() {
    // For shorter screens
    if ( innerHeight < 700 ) {
        document.querySelectorAll( "#keypad button" ).forEach(button => {
            button.style.fontSize = "20pt";
            button.style.backgroundSize = "100% 100%";
        });
        keypad.style.gridTemplateRows = "60px 60px 60px 60px 60px";
        historyBox.style.maxHeight = "295px";
    // For taller screens
    } else {
        document.querySelectorAll( "#keypad button" ).forEach(button => {
            button.style.fontSize = "";
            button.style.backgroundSize = "";
        });
        keypad.style.gridTemplateRows = "";
        historyBox.style.maxHeight = "";
    }
}
// Updates the layout in real time
setInterval( updateLayout, 100 );