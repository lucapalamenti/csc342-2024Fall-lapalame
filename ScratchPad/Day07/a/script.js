let toggle = document.querySelector('#darkModeToggle');
let html = document.querySelector("html");

toggle.addEventListener( 'click', ( element ) => {
    if ( element.target.checked ) {
        html.style.filter = "invert(1)";
    } else {
        html.style.filter = "invert(0)";
    }
});