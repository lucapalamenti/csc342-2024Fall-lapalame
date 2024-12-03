const crypto = require('crypto');
let users = require( './data/users.json' );

function filteredUser( user ) {
    return rtn = {
        "id": user["id"],
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "username": user["username"],
        "avatar": user["avatar"],
        "profile_banner": user["profile_banner"],
        "following": user["following"]
    };
}

module.exports.getUsers = () => {
        return new Promise(( resolve, reject ) => {
            // Return an array of all the 'values' of the key:value pairs
            resolve( Object.values( users ) );
        });
};

module.exports.getUserById = ( userId ) => {
        return new Promise(( resolve, reject ) => {
            // If the user id exists in users.json
            if ( users[ userId ] ) {
                resolve( filteredUser( users[ userId ] ) );
            }
            // If the user id was not found in users.json
            else {
                reject({ code: 401, message: "User id not found!" });
            }
        });
};

module.exports.getUserByCredentials = ( username, password ) => {
        return new Promise(( resolve, reject ) => {
            const user = Object.values( users ).find( user => user.username == username );
            // If a matching user exists
            if ( user ) {
                crypto.pbkdf2( password, user.salt, 100000, 64, 'sha512', (err, derivedKey) => {
                    if ( err ) { //problem computing digest, like hash function not available
                        reject({code: 500, message: "Error hashing password " + err});
                        return;
                    }
            
                    const digest = derivedKey.toString('hex');
                    if ( user.password == digest ) {
                        resolve( filteredUser( user ) );
                    }
                    else {
                        reject({code: 401, message: "Invalid password"});
                    }
                });
            } else {
                reject({code: 401, message: "No user found with the given username"});
            }
        });
};

/**
 * Returns the following list for a user object
 * @param {Number | String} userId id of a user
 * @returns an array of numbers
 */
module.exports.getFollowedUsersIds = ( userId ) => {
    return new Promise(( resolve, reject ) => {
        // If the user id is valid
        this.getUserById( userId ).then( returnedUser => {
            let followingList = [ ...returnedUser.following ];
            // Add the user's own user id
            followingList.push( Number( userId ) );
            resolve( followingList );
        // If the user id was not found
        }).catch( err => {
            reject({ code: 401, message: "User id not found!" });
        });
    });
};

module.exports.addFollow = ( currentUserId, otherUserId ) => {
    return new Promise(( resolve, reject ) => {
        const currentUser = users[ currentUserId ];
        // Invalid current user id
        if ( !currentUser ) {
            reject({ code: 401, message: "Current user id not found!" });
            return;
        }
        const otherUser = users[ otherUserId ];
        // Invalid other user id
        if ( !otherUser ) {
            reject({ code: 401, message: "Other user id not found!" });
            return;
        }
        currentUser.following.push( otherUser.id );
        resolve( currentUser.following );
    });
};

module.exports.removeFollow = ( currentUserId, otherUserId ) => {
    return new Promise(( resolve, reject ) => {
        const currentUser = users[ currentUserId ];
        // Invalid current user id
        if ( !currentUser ) {
            reject({ code: 401, message: "Current user id not found!" });
            return;
        }
        const otherUserIndex = currentUser.following.indexOf( otherUserId );
        // Invalid other user id
        if ( otherUserIndex == -1 ) {
            reject({ code: 401, message: "Cannot unfollow a user that you don't already follow!" });
            return;
        }
        // Remove the user id from following list
        currentUser.following.splice( otherUserIndex, 1 );
        resolve( currentUser.following );
    });
};