import qSelectors from "./inputQuerySelectors.js";

let fileButton = document.querySelector( "#imageFileButton > input" );
// Updates the sender's image when a new file is selected
fileButton.addEventListener( 'change', () => {
    const file = fileButton.files[0];
    if ( file ) {
        if ( file.size > 200000 ) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL( file );
        reader.onload = function ( e ) {
            document.querySelector( "img" ).src = e.target.result;
            qSelectors.imageFileName.value = fileButton.files[0].name;
        }
    }
});
// Disables typing in the file name input box
qSelectors.imageFileName.addEventListener( 'keydown', key => {
    key.preventDefault();
});

let CCVLength = 3;
qSelectors.paymentCardType.addEventListener( 'change', () => {
    if ( qSelectors.paymentCardType.value === 'Visa' ) {
        CCVLength = 3;
    } else if ( qSelectors.paymentCardType.value === 'Mastercard' ) {
        CCVLength = 3;
    } else if ( qSelectors.paymentCardType.value === 'American Express' ) {
        CCVLength = 4;
    }
})

// Make sure only numbers are entered for card number
qSelectors.paymentCardNumber.forEach( slot => {
    slot.addEventListener( 'keydown', key => {
        // Invalid key was pressed or there are already 4 digits in this box
        if ( slot.value.length === 4 ) {
            if ( key.key !== 'Backspace' && key.key !== 'ArrowLeft' && key.key !== 'ArrowRight' ) {
                key.preventDefault();
            }
        }
    });
});

// Jumps from Card Number input 0 to Card Number input 1
qSelectors.paymentCardNumber[0].addEventListener( 'keyup', key => {
    if ( qSelectors.paymentCardNumber[0].value.length === 4 ) {
        qSelectors.paymentCardNumber[1].focus();
    }
});
// Jumps from Card Number input 1 to Card Number input 2
qSelectors.paymentCardNumber[1].addEventListener( 'keyup', key => {
    if ( qSelectors.paymentCardNumber[1].value.length === 4 ) {
        qSelectors.paymentCardNumber[2].focus();
    }
});
// Jumps from Card Number input 2 to Card Number input 3
qSelectors.paymentCardNumber[2].addEventListener( 'keyup', key => {
    if ( qSelectors.paymentCardNumber[2].value.length === 4 ) {
        qSelectors.paymentCardNumber[3].focus();
    }
});
// Jumps from Card Number input to Expiration input
qSelectors.paymentCardNumber[3].addEventListener( 'keyup', key => {
    if ( qSelectors.paymentCardNumber[3].value.length === 4 ) {
        qSelectors.paymentExpiration.focus();
    }
});

// Make sure only numbers are entered into CCV
qSelectors.paymentCCV.addEventListener( 'keydown', key => {
    // Invalid key was pressed or there are already CCVLength digits in this box
    if ( !/^[0-9]$/.test( key.key ) || qSelectors.paymentCCV.value.length === 4 ) {
        if ( key.key !== 'Backspace' && key.key !== 'ArrowLeft' && key.key !== 'ArrowRight' ) {
            key.preventDefault();
        }
    }
});
// Jumps from card Expiration to CCV
qSelectors.paymentCCV.addEventListener( 'keyup', () => {
    
    if ( qSelectors.paymentCCV.validity.valid === true && qSelectors.paymentCCV.value.length === CCVLength ) {
        qSelectors.paymentAmount.focus();
    }
});