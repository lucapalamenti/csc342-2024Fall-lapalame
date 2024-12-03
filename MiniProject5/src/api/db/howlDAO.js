let howls = require( './data/howls.json' );
const userDAO = require('./userDAO');

module.exports.getHowls = () => {
    return new Promise(( resolve, reject ) => {
        // Return an array of all the 'values' of the key:value pairs
        resolve( Object.values( howls ) );
    });
};

module.exports.getHowlsFromUserId = ( userId ) => {
    return new Promise(( resolve, reject ) => {
        // First check if the user exists
        if ( userDAO.getUserById( userId ) ) {
            // List to store howls in
            let howlList = [];
            // For each howl in howls.json
            howls.forEach( howl => {
                // If the howl is from the specified user
                if ( howl.userId == userId ) {
                    howlList.push( howl );
                }
            });
            //let howlList = howls.filter( howl => howl.userId == userId );
            resolve( howlList );
        }
        // If no user with the given user id exists
        else {
            reject({ code: 401, message: "Couldn't create howl. User id not found!" });
        }
    });
};

// returns a list of howl objects that the given user follows
module.exports.getFollowedUsersHowls = ( currentUserId ) => {
    return new Promise(( resolve, reject ) => {
        userDAO.getFollowedUsersIds( currentUserId ).then( followingList => {
            let howlList = howls.filter( howl => 
                followingList.includes( howl.userId )
            );
            resolve( howlList );
        }).catch( err => {
            reject({ error: err });
        });
    });
};

module.exports.createHowl = ( userId, message ) => {
    return new Promise(( resolve, reject ) => {
        // If a user with the given user id exists
        userDAO.getUserById( userId ).then( returnedUser => {
            const newHowl = {
                id: howls.length + 1,
                userId: returnedUser.id,
                datetime: new Date(),
                text: message
            };
            howls.push( newHowl );
            resolve( newHowl );
        }).catch( err => {
            reject({ code: 401, message: "Couldn't create howl. User id not found!" });
        });
    });
};