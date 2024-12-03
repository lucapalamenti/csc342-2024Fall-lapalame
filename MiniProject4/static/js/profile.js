import api from './APIClient.js';
import bubbleSort from './bubbleSort.js';

const query = window.location.search;
let parameters = new URLSearchParams( query );
const id = Number( parameters.get( 'id' ) );

const followUserButton = document.querySelector( '#follow-user-button');

followUserButton.addEventListener( 'click', e => {
    api.getCurrentUser().then( returnedCurrentUser => {
        api.getFollowedUsersIds( returnedCurrentUser.id ).then( returnedIdList => {
            // If the current user already follows the user on the page
            if ( returnedIdList.indexOf( id ) != -1 ) {
                api.removeFollow( returnedCurrentUser.id, id ).then( newFollowingList => {
                    followUserButton.textContent = "Follow";
                }).catch( err => {
                    document.location = '/error';
                });
            }
            else {
                api.addFollow( returnedCurrentUser.id, id ).then( newFollowingList => {
                    followUserButton.textContent = "Unfollow";
                }).catch( err => {
                    document.location = '/error';
                });
            }
        }).catch( err => {
            document.location = '/error';
        });
    }).catch( err => {
        document.location = '/error';
    });
});

api.getUserById( id ).then( returnedUser => {
    document.title = 'Profile - ' + returnedUser.username;
    document.querySelectorAll( '.profile-name' ).forEach( element => {
        element.textContent = returnedUser["first_name"] + " " + returnedUser["last_name"];
    });
    document.querySelectorAll( '.profile-tag' ).forEach( element => {
        element.textContent = "@" + returnedUser["username"];
    });
    document.querySelectorAll( '.profile-avatar' ).forEach( element => {
        element.src = returnedUser["avatar"];
    });
    api.getCurrentUser().then( returnedCurrentUser => {
        // if the profile page DOESNT BELONG to the current user
        if ( returnedCurrentUser.id != id ) {
            followUserButton.classList.remove( 'hidden' );
            api.getFollowedUsersIds( returnedCurrentUser.id ).then( returnedIdList => {
                // If the current user already follows the user on the page
                if ( returnedIdList.indexOf( id ) != -1 ) {
                    followUserButton.textContent = "Unfollow";
                } else {
                    followUserButton.textContent = "Follow";
                }
            }).catch( err => {
                document.location = '/error';
                console.error( err );
            });
        }
    }).catch( err => {
        document.location = '/error';
        console.error( err );
    });
}).catch( err => {
    document.location = '/error';
    console.error( err );
});


const howlArea = document.querySelector( '#howl-area' );
const howlTemplate = document.querySelector( '#howl-template' );

howlArea.innerHTML = '';
api.getHowlsFromUserId( id ).then( returnedHowls => {
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
    document.location = '/error';
    console.error( err );
});

const followsBar = document.querySelector( '#follows-bar' );
const followsTemplate = document.querySelector( '#follows-template' );

api.getFollowedUsersIds( id ).then( returnedIdList => {
    returnedIdList.forEach( userId => {
        if ( userId != id ) {
            const followsInstance = followsTemplate.content.cloneNode( true );
            const followsElement = followsInstance.querySelector( '#follows-container' );

            const followsBanner = followsElement.querySelector( '#follows-banner' );
            const followsUserAvatar = followsElement.querySelector( '#follows-user-avatar' );
            const followsName = followsElement.querySelector( '#follows-name' );
            const followsTag = followsElement.querySelector( '#follows-tag' );
            // Append this element BEFORE calling an asynchronous function
            followsBar.appendChild( followsElement );

            api.getUserById( userId ).then( returnedUser => {
                followsElement.href = '/profile?id=' + userId;
                //followsBanner["background-image"] = 'url(returnedUser["avatar"])';
                followsUserAvatar.src = returnedUser["avatar"];
                followsName.textContent = returnedUser["first_name"] + " " + returnedUser["last_name"];
                followsTag.textContent = "@" + returnedUser["username"];
            }).catch( err => {
                document.location = '/error';
                console.error( err );
            });
        }
    });
}).catch( err => {
    document.location = '/error';
    console.error( err );
})
