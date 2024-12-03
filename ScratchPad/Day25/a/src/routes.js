const express = require('express');
const router = express.Router();

const frontendRouter = require('./frontend/FrontendRoutes');
router.use(frontendRouter);

const webSocketRouter = require('./WebSocketRoutes');
router.use(webSocketRouter);

module.exports = router;