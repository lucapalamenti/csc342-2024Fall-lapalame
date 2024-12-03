import api from './APIClient.js'

const loginForm = document.querySelector( '#login-form' );
const username = loginForm.querySelector( '#username' );
const password = loginForm.querySelector( '#password' );

const loginError = document.querySelector( '#login-error' );

loginForm.addEventListener( 'submit', e => {
    e.preventDefault();

    api.logIn( username.value, password.value ).then( e => {
        document.location = './';
    }).catch( err => {
        loginError.textContent = "Error logging in - " + err.message;
        loginError.classList.remove("hidden");
    });
});