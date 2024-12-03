const crypto = require('crypto');

const sessions = {};
const SESSION_COOKIE_NAME = "NCParks";

module.exports.initializeSession = (req, res, user) => {
  const sessionId = crypto.randomBytes(64).toString('hex');
  const sessionData = {
    user: user,
    visitedParks: [],
    createdAt: new Date(),
  };
  sessions[ sessionId ] = sessionData;

  res.cookie( SESSION_COOKIE_NAME, sessionId, {
    secure: true,
    httpOnly: true,
    maxAge: 120000 // 2 minutes
  });
};

module.exports.removeSession = (req, res) => {
  const sessionId = req.cookies[SESSION_COOKIE_NAME];
  if ( sessionId ) {
    delete sessions[ sessionId ];
  }
  res.cookie( SESSION_COOKIE_NAME, "", {
    secure: true,
    httpOnly: true,
    maxAge: -1
  });
};

module.exports.CookieAuthMiddleware = (req, res, next) => {
  const sessionId = req.cookies[SESSION_COOKIE_NAME];
  if ( !sessionId ) {
    res.status(401).json({error: 'Not Authenticated'});
    return;
  } else {
    if ( !sessions[sessionId] ) {
      this.removeSession( req, res );
      res.status(401).json({error: 'Not Authenticated'});
      return;
    } else {
      req.session = sessions[sessionId];
      next();
      return;
    }
  }
};
