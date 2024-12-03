import qSelectors from "./inputQuerySelectors.js";

// Changes the recipient field required based on which notification type is selected
let notifyArea = document.querySelector( "#notifyArea" );
notifyArea.addEventListener('click', element => {
    if ( element.target.tagName === 'INPUT' ) {
        const v = element.target.value;
        // Div containers containing the label and input area
        const emailField = document.querySelector( "#recipientEmailField" );
        const phoneField = document.querySelector( "#recipientPhoneField" );
        if ( v === "email" ) {
            qSelectors.recipientEmailFieldInput.value = '';
            emailField.style.display = "block";
            qSelectors.recipientPhoneFieldInput.value = ' ';
            phoneField.style.display = "none";
        } else if ( v === "SMS" ) {
            qSelectors.recipientEmailFieldInput.value = '0@0';
            emailField.style.display = "none";
            qSelectors.recipientPhoneFieldInput.value = '';
            phoneField.style.display = "block";
        } else if ( v === "dontNotify" ) {
            qSelectors.recipientEmailFieldInput.value = '0@0';
            emailField.style.display = "none";
            qSelectors.recipientPhoneFieldInput.value = ' ';
            phoneField.style.display = "none";
        }
    }
});