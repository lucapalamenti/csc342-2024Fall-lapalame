import api from './APIClient.js';
import bubbleSort from './bubbleSort.js';

const howlArea = document.querySelector( '#howl-area' );
const howlTemplate = document.querySelector( '#howl-template' );

const MAX_HOWL_CHARACTERS = 200;

function refreshFeed() {
    howlArea.innerHTML = '';
    // get the current user
    api.getCurrentUser().then( currentUserObject => {
        api.getFollowedUsersHowls( currentUserObject.id ).then( returnedHowls => {
            // Sort the howls based on their "datetime" key
            returnedHowls = bubbleSort.bubbleSortObjectsReverse( returnedHowls, "datetime");
            
            returnedHowls.forEach( howl => {

                const howlInstance = howlTemplate.content.cloneNode( true );
                const howlElement = howlInstance.querySelector( '#howl-container' );

                const howlUserAvatar = howlElement.querySelector( '#howl-user-avatar' );
                const howlUserNameLink = howlElement.querySelector( '#howl-user-name-link' );
                const howlUserName = howlElement.querySelector( '#howl-user-name' );
                const howlUserTag = howlElement.querySelector( '#howl-user-tag' );
                const howlDate = howlElement.querySelector( '#howl-date' );
                const howlMessage = howlElement.querySelector( '#howl-message' );
                // Append this element BEFORE calling an asynchronous function
                howlArea.appendChild( howlElement );

                api.getUserById( howl.userId ).then( returnedUser => {
                    howlUserAvatar.src = returnedUser["avatar"];
                    howlUserNameLink.href = '/profile?id=' + howl.userId;
                    howlUserName.textContent = returnedUser["first_name"] + " " + returnedUser["last_name"];
                    howlUserTag.textContent = "@" + returnedUser["username"];
                    howlDate.textContent = howl["datetime"];
                    howlMessage.textContent = howl["text"];
                });
            });
            
        }).catch( err => {
            console.error( err );
        });
    }).catch( err => {
        console.error( err );
    });
}
refreshFeed();

const postAreaForm = document.querySelector( '#post-area');
const postAreaText = document.querySelector( '#post-area-text' );
const charsRemaining = document.querySelector( '#characters-remaining' );

postAreaText.addEventListener( 'keydown', key => {
    if ( postAreaText.value.trim().length >= MAX_HOWL_CHARACTERS && key.key != 'Backspace' ) {
        key.preventDefault();
    }
});
postAreaText.addEventListener( 'keyup', key => {
    charsRemaining.textContent = MAX_HOWL_CHARACTERS - postAreaText.value.trim().length;
    
});

postAreaForm.addEventListener( 'submit', e => {
    e.preventDefault();
    
    // Prevent users from posting empty howls
    if ( postAreaText.value.trim() != '' && postAreaText.value.length <= MAX_HOWL_CHARACTERS ) {
        api.getCurrentUser().then( returnedUser => {
            api.createHowl( returnedUser.id, postAreaText.value.trim() ).then( newHowl => {
                refreshFeed();
                postAreaText.value = '';
            }).catch( err => {
                console.error( err );
            });
        }).catch( err => {
            console.error( err );
        });
    }
});