const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const { initializeSession, removeSession, CookieAuthMiddleware } = require( '../middleware/CookieAutheticationMiddleware' );

const apiRouter = express.Router();


apiRouter.use( cookieParser() );
// Important for parsing incoming JSON payload and making that data available in 'req.body'
apiRouter.use( express.json() );

const howlDAO = require( './db/howlDAO' );
const userDAO = require( './db/userDAO' );

// Get all users in users.json
apiRouter.get( '/users', CookieAuthMiddleware, (req, res) => {
    userDAO.getUsers().then( users => {
        res.json( users );
    }).catch( err => {
        res.status(500).json({error: "Internal server error"});
    });
});

// Get a specific user from users.json
apiRouter.get( '/users/:userId', CookieAuthMiddleware, (req, res) => {
    const userId = req.params.userId;
    if ( userId == 'current' ) {
        res.json( req.session.user );
    } else {
        userDAO.getUserById( userId ).then( user => {
            res.json( user );
        }).catch( err => {
            res.status(400).json( err );
        });
    }
});

apiRouter.get( '/users/:userId/following', CookieAuthMiddleware, (req, res) => {
    userDAO.getFollowedUsersIds( req.params.userId ).then( returnedList => {
        res.json( returnedList );
    }).catch( err => {
        res.status(400).json( err );
    })
});

// Log a user into the web application
apiRouter.post( '/login', (req, res) => {
    // If req.body provides the necessary fields
    if ( req.body.username ) {
        userDAO.getUserByCredentials( req.body.username ).then( returnedUser => {
            initializeSession( req, res, returnedUser );
            res.json({user: returnedUser});
        }).catch( err => {
            res.status(401).json( err );
        });
    } else {
        res.status(400).json({error: 'All credentials were not provided'});
    }
});

apiRouter.post( '/logout', (req, res) => {
    removeSession( req, res ); 
    res.json({success: true});
});

// Get all howls in howls.json
apiRouter.get( '/howls', CookieAuthMiddleware, (req, res) => {
    howlDAO.getHowls().then( howls => {
        res.json( howls );
    }).catch( err => {
        res.status(500).json({error: err});
    });
});

// Get all howls from a specific user
apiRouter.get( '/howls/:userId', CookieAuthMiddleware, (req, res) => {
    howlDAO.getHowlsFromUserId( req.params.userId ).then( howls => {
        res.json( howls );
    }).catch( err => {
        res.status(500).json({error: err});
    });
});

// get all howls from all followed users
apiRouter.get( '/howls/:userId/following', CookieAuthMiddleware, (req, res) => {
    howlDAO.getFollowedUsersHowls( req.params.userId ).then( returnedHowlList => {
        res.json( returnedHowlList );
    }).catch( err => {
        res.status(400).json( err );
    });
});

// Create a howl
apiRouter.post( '/howls', CookieAuthMiddleware, (req, res) => {
    howlDAO.createHowl( req.body.userId, req.body.message ).then( howl => {
        res.json( howl );
    }).catch( err => {
        res.status(500).json({error: 'Internal server error'});
    });
});

// Add a follower to following list
apiRouter.post( '/users/:userId/following/:followId', CookieAuthMiddleware, (req, res) => {
    userDAO.addFollow( Number( req.params.userId ), Number( req.params.followId ) ).then( followingIdList => {
        res.json( followingIdList );
    }).catch( err => {
        res.status(400).json( err );
    })
});

// remove a follower to following list
apiRouter.delete( '/users/:userId/following/:unfollowId', CookieAuthMiddleware, (req, res) => {
    userDAO.removeFollow( Number( req.params.userId ), Number( req.params.unfollowId ) ).then( newFollowingIdList => {
        res.json( newFollowingIdList );
    }).catch( err => {
        res.status(400).json( err );
    })
});

module.exports = apiRouter;