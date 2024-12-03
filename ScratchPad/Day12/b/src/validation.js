
module.exports = function validateRegistration(body) {
	let valid = true;
	let errors = [];

	if ( !/^[a-z]{5,}$/.test( body.username ) ) {
		errors.push( "Username must be at least 5 characters long and only contain lowercase letters." );
		valid = false;
	}
	if ( body.password.length < 8 ) {
		errors.push( "Password must be at least 8 characters long." );
		valid = false;
	}
	if ( body.password != body["confirm-password"] ) {
		errors.push( "Passwords do not match." );
		valid = false;
	}
	if ( body.language == "" ) {
		errors.push( "Must select a language." );
		valid = false;
	}
	if ( body.terms != "on" ) {
		errors.push( "You must accept the terms of service." );
		valid = false;
	}

	// Check state of 'valid'
	if ( !valid ) {
		console.log( errors );
		return false;
	}
	return true;
};


// form.reportValidity();
// event.preventDefault();