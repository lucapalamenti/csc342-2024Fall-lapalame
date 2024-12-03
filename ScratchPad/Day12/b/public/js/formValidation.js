export default function validateForm(event) {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const confirmP = document.querySelector("#confirm-password");
    const language = document.querySelector("#language");
    const checkbox = document.querySelector("#terms");

    let valid = false;
    let errors = [];

    username.setCustomValidity( "" );
    if ( !username.checkValidity() ) {
        username.setCustomValidity( "Username must be at least 5 characters long and only contain lowercase letters." );
        errors.push( "Username must be at least 5 characters long and only contain lowercase letters." );
		valid = false;
    }

    password.setCustomValidity( "" );
    if ( !password.checkValidity() ) {
        password.setCustomValidity( "Password must be at least 8 characters long." );
        errors.push("Password must be at least 8 characters long.");
        valid = false;
    }
    
    confirmP.setCustomValidity( "" );
    if ( confirmP !== password ) {
        confirmP.setCustomValidity( "Passwords do not match." );
        errors.push( "Passwords do not match." );
		valid = false;
    }
    
    language.setCustomValidity( "" );
    if ( !language.checkValidity( "Must select a language." ) ) {
        errors.push( "Must select a language." );
		valid = false;
    }
    
    checkbox.setCustomValidity( "" );
    if ( !checkbox.checkValidity( "You must accept the terms of service." ) ) {
        errors.push( "You must accept the terms of service." );
		valid = false;
    }

    if (!valid) {
        console.log(errors);
        form.reportValidity();
        event.preventDefault();
    }
}