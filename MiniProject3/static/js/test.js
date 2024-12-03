import qSelectors from "./inputQuerySelectors.js";

document.addEventListener( 'keydown', key => {
    // return;
    if ( key.key == '`') {
        qSelectors.imageFileName.value = "a.png";
        qSelectors.senderFirstname.value = "Luca";
        qSelectors.senderLastname.value = "Luca";

        qSelectors.recipientFirstname.value = "Luca";
        qSelectors.recipientLastname.value = "Luca";
        qSelectors.recipientMessage.value = "1234567890";
        
        qSelectors.paymentCardNumber[0].value = "1234";
        qSelectors.paymentCardNumber[1].value = "1234";
        qSelectors.paymentCardNumber[2].value = "1234";
        qSelectors.paymentCardNumber[3].value = "1234";
        qSelectors.paymentExpiration.value = "2203-09-11";
        qSelectors.paymentCCV.value = "123";
        qSelectors.paymentAmount.value = "100";
    }
});

