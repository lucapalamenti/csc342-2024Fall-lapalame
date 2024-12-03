const crypto = require('crypto');

const sessions = {};
const SESSION_COOKIE_NAME = "HowlerSession";

module.exports.initializeSession = (req, res, user) => {
    // Randomized session ID
    const sessionId = crypto.randomBytes(64).toString('hex');
    // Holds the data we want to store in the session
    const sessionData = {
        user: user,

        createAt: new Date()
    };
    sessions[sessionId] = sessionData;

    res.cookie(SESSION_COOKIE_NAME, sessionId, {
        // Ensure the cookie is only sent over HTTPS, protecting it from being intercepted.
        secure: true,
        // Can only be accessed by the server and not by client-side scripts
        httpOnly: true,
        // How many miliseconds will the cookie expire in
        maxAge: 1000 * 60 * 60 // 60 minutes
    });
};

module.exports.removeSession = (req, res) => {
    const sessionId = req.cookies[SESSION_COOKIE_NAME];
    // If the session id is found
    if (sessionId) {
        delete sessions[sessionId];
    }
    // Since we cannot simply 'remove' the cookie, we will just replace it with an
    // expired cookie with no sessionId
    res.cookie(SESSION_COOKIE_NAME, "", {
        secure: true,
        httpOnly: true,
        maxAge: -1
    });
};

module.exports.CookieAuthMiddleware = (req, res, next) => {
    const sessionId = req.cookies[SESSION_COOKIE_NAME];
    // If the session doesnt exist
    if (!sessionId) {
        res.status(401).json({ error: 'Not Authenticated' });
    } else {
        // If the session exists but is expired
        if (!sessions[sessionId]) {
            this.removeSession(req, res);
            res.status(401).json({ error: 'Not Authenticated' });
        // The session is not expired, so restore it
        } else {
            req.session = sessions[sessionId];
            next();
        }
    }
};