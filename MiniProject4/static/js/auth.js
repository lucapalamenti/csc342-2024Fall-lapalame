import api from "./APIClient.js";

let usernameDisplay = document.querySelector( '#username-display' );
let avatarDisplay = document.querySelector( '#user-avatar' );
function displayUserInHeader( user ) {
    usernameDisplay.textContent = "@" + user.username;
    avatarDisplay.src = user["avatar"];
}
  
api.getCurrentUser().then( returnedUser => {
    displayUserInHeader( returnedUser );
}).catch( err => {
    console.log(`${err.status}`, err);
    if( err.status === 401 ) {
        document.location = './login';
    }
});

const profileButton = document.querySelector( '#profile-button' );
if ( profileButton ) {
    profileButton.addEventListener( 'click', e => {
        e.preventDefault();
        api.getCurrentUser().then( returnedUser => {
            document.location = '/profile?id=' + returnedUser.id;
        // This catch will likely never occur
        }).catch( err => {
            console.error( err );
        });
    });
}

const logoutButton = document.querySelector( '#logout-button' );
logoutButton.addEventListener( 'click', e => {
    e.preventDefault();
    api.logOut().then( () => {
        document.location = './login';
    });
});