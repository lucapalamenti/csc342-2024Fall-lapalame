const crypto = require('crypto');

function generateSessionId() {
    return crypto.randomBytes(6).toString('hex');
}

const sessions = {};
const SESSION_COOKIE_NAME = 'NCParks';

function generateEmptySession() {
    return {
        visitedParks: [],
        createdAt: new Date(),
    };
}
function SessionCookieMiddleware(req, res, next) {
    console.log("11111");
    // If the request doesn't have a cookie with the existing SESSION_COOKIE_NAME
    if ( !req.cookies[ SESSION_COOKIE_NAME ] ) {
        // Generate a new session id
        const sessionID = generateSessionId();
        // Create a new session and store it in 'sessions'
        const newSession = generateEmptySession();
        sessions[ sessionID ] = newSession;
        // Store session object for next() to use
        req.session = newSession;

        res.cookie( SESSION_COOKIE_NAME, sessionID, {
            secure: true,
            httpOnly: true,
            maxAge: 120000 // 2 minutes
        });
        console.log( 'We have a new visitor!', sessionId, req.session );
    }
    // Restore session since the cookie exists
    else {
        // Get session id from cookie
        const sessionID = req.cookies[ SESSION_COOKIE_NAME ];
        if ( !sessionID ) {
            sessionID = generateSessionId();
            sessions[ sessionID ] = generateEmptySession();
        }
        req.session = sessions[ sessionID ];
        console.log('Oh look,', sessionId, 'is back!', req.session);
    }
    next();
}

module.exports = SessionCookieMiddleware;