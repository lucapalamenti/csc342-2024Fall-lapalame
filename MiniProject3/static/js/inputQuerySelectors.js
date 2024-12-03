export default {
    imageFileName : document.querySelector("#imageFileName"),
    senderFirstname : document.querySelector("#senderFirstname"),
    senderLastname : document.querySelector("#senderLastname"),

    recipientFirstname : document.querySelector("#recipientFirstname"),
    recipientLastname : document.querySelector("#recipientLastname"),
    recipientMessage : document.querySelector("#recipientMessage"),
    recipientEmailFieldInput : document.querySelector("#recipientEmail"),
    recipientPhoneFieldInput : document.querySelector("#recipientPhone"),

    paymentCardType : document.querySelector("#paymentCardType"),
    paymentCardNumber : [
        document.querySelector("#paymentCardNumber0"),
        document.querySelector("#paymentCardNumber1"),
        document.querySelector("#paymentCardNumber2"),
        document.querySelector("#paymentCardNumber3"),
    ],
    paymentExpiration : document.querySelector("#paymentExpiration"),
    paymentCCV : document.querySelector("#paymentCCV"),
    paymentAmount : document.querySelector("#paymentAmount"),
    terms : document.querySelector("#terms"),
};