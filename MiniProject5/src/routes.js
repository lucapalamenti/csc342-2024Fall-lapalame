const express = require('express');
const frontendRouter = require( './frontend/frontendRoutes' );
const apiRouter = require( './api/apiRoutes' );

const router = express.Router();
router.use( frontendRouter );
router.use( '/api', apiRouter );

module.exports = router;