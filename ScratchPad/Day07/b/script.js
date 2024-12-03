let inputField = document.querySelector("#restrictive-input");

inputField.addEventListener( 'keydown', restrictInput );

function restrictInput( e ) {
    console.log(e);
    if ( !/^[A-Z]$/.test( e.key ) && e.key !== "Backspace" ) {
        e.preventDefault();
    }
}