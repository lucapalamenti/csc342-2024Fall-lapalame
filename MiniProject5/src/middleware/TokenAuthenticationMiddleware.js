const { Buffer } = require('buffer');
//const jwt = require('jsonwebtoken');
const jwt = require( './mockJWT.js' );

const TOKEN_COOKIE_NAME = "HowlerWebToken";
const API_SECRET = "12345";

exports.TokenMiddleware = (req, res, next) => {
    let token = req.cookies[ TOKEN_COOKIE_NAME ];
    // If the cookie with our token doesnt exist
    if ( !token ) {
        // HTTP header
        // Authorization: Bearer <token_string>
        const authHeader = req.get('Authorization');
        if (authHeader && authHeader.startsWith("Bearer ")) {
            // We only need the <token_string> portion
            token = authHeader.split(" ")[1].trim();
        }
    }

    // Basically, if <token_string> is empty
    if ( !token ) {
        res.status(401).json({ error: 'Not Authenticated' });
        return;
    }

    try {
        const payload = jwt.verify( token, API_SECRET );
        req.user = payload.user;
        next();
    } catch ( error ) { // jwt determined the token is invalid
        res.status(401).json({ error: 'Not Authenticated' });
    }
}

exports.generateToken = ( req, res, user ) => {
    // We are creating the payload
    let payload = {
        user: user,
        exp: (Date.now() + 1000 * 60 * 60) / 1000, // One hour from now
    };
    // And then signing the payload to make a jwt
    const token = jwt.sign( payload, API_SECRET );

    // Finally send the token in a cookie to the client
    res.cookie(TOKEN_COOKIE_NAME, token, {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 10 // 10 minutes
    });
};

exports.removeToken = (req, res) => {
    res.cookie( TOKEN_COOKIE_NAME, "", {
        secure: true,
        httpOnly: true,
        maxAge: -1
    });
};