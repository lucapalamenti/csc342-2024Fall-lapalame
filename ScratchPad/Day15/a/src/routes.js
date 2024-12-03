const express = require('express');
const router = express.Router();

const app = express();
app.use( '/api', router );

const APIRoutes = require( './api/APIRoutes' );
router.use( '/api', APIRoutes );

const frontendRouter = require('./frontend/FrontendRoutes');
router.use(frontendRouter);

module.exports = router;