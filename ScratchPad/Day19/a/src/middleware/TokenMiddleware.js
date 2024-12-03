const jwt = require('jsonwebtoken');
const TOKEN_COOKIE_NAME = "NCParksToken";
const API_SECRET = "12345";

// Create your own secret key for the token here.
// In a real application, you will never hard-code this secret and you will
// definitely never commit it to version control, ever

exports.TokenMiddleware = (req, res, next) => {
    // We will look for the token in two places:
    // 1. A cookie in case of a browser
    // 2. The Authorization header in case of a different client
    let token = null;
    // If the cookie with out token already exists
    if (req.cookies[TOKEN_COOKIE_NAME]) {
        // Get token from cookie
        token = req.cookies[TOKEN_COOKIE_NAME];
        // No cookie, so let's check Authorization header
    } else {
        // HTTP header
        // Authorization: Bearer <token_string>
        const authHeader = req.get('Authorization');
        if (authHeader && authHeader.startsWith("Bearer ")) {
            // We only need the <token_string> portion
            token = authHeader.split(" ")[1].trim();
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Not Authenticated' });
        return;
    }

    try {
        const payload = jwt.verify(token, API_SECRET);
        req.user = payload.user;
        next();
    } catch (error) { // jwt determined the token is invalid
        res.status(401).json({ error: 'Not Authenticated' });
    }
}


exports.generateToken = (req, res, user) => {
    let payload = {
        user: user,
        exp: (Date.now() + 1000 * 60 * 60) / 1000, // One hour from now
    };
    const token = jwt.sign(payload, API_SECRET);

    // Send token in cookie to client
    res.cookie(TOKEN_COOKIE_NAME, token, {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 2 // 2 minutes
    });
};


exports.removeToken = (req, res) => {
    res.cookie(TOKEN_COOKIE_NAME, "", {
        secure: true,
        httpOnly: true,
        maxAge: -1
    });
};

