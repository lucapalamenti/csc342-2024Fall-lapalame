module.exports = { validateRegistration };

const bannedUsers = require( './static/js/bannedUsers.js' );

function validateRegistration( form ) {
    let valid = true;
    errors = [];
    bannedUsers.forEach( user => {
        if ( user.firstname === form.recipientFirstname.toLowerCase()
        ||   user.lastname === form.recipientLastname.toLowerCase() ) {
            errors.push( "Could not send to this user.");
            valid = false;
        }
    });

    // Validate sender
    const extensions = [ '.png', '.jpg', '.jpeg', '.gif' ];
    if ( "" === form.file || !extensions.includes( form.file.toLowerCase().slice( form.file.lastIndexOf( '.' ) ) ) ) {
        errors.push( "Invalid image file." );
        valid = false;
    }
    if ( !/^[a-zA-Z]+$/.test( form.senderFirstname ) ) {
        errors.push( "Sender first name invalid." );
        valid = false;
    }
    if ( !/^[a-zA-Z]+$/.test( form.senderLastname ) ) {
        errors.push( "Sender last name invalid." );
        valid = false;
    }

    // Validate recipient
    if ( !/^[a-zA-Z]+$/.test( form.recipientFirstname ) ) {
        errors.push( "Recipient first name required." );
        valid = false;
    }
    if ( !/^[a-zA-Z]+$/.test( form.recipientLastname ) ) {
        errors.push( "Recipient last name required." );
        valid = false;
    }
    if ( form.recipientMessage.length < 10 ) {
        errors.push( "Message length must be at least 10 characters." );
        valid = false;
    }

    // Validate payment
    if ( !/^[0-9]{4}$/.test( form.paymentCardNumber0 )
      || !/^[0-9]{4}$/.test( form.paymentCardNumber1 )
      || !/^[0-9]{4}$/.test( form.paymentCardNumber2 )
      || !/^[0-9]{4}$/.test( form.paymentCardNumber3 ) ) {
        errors.push( "Invalid card number." );
        valid = false;
    }
    if ( !/^[0-9]+$/.test( form.paymentCCV ) ) {
        errors.push( "Invalid card CCV." );
        valid = false;
    }
    if ( form.paymentCardType === 'American Express' && form.paymentCCV.length !== 4 ) {
        errors.push( "Invalid card CCV." );
        valid = false;
    }
    if ( (form.paymentCardType === 'Visa' || form.paymentCardType === 'Mastercard' )
    && form.paymentCCV.length !== 3 ) {
        errors.push( "Invalid card CCV." );
        valid = false;
    }
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let todayDate = `${year}-${month}-${day}`;
    if ( todayDate.localeCompare( form.paymentExpiration ) > 0 ) {
        errors.push( "Card is expired." );
        valid = false;
    }
    if ( form.paymentAmount <= 0 ) {
        errors.push( "Cannot send zero or negative amount." );
        valid = false;
    }
    if ( "on" !== form.terms ) {
        errors.push( "Must accept terms and conditions." );
        valid = false;
    }
    
    console.log( errors );
    return valid;
}