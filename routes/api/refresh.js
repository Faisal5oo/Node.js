const express = require("express");
const router = express.Router();

const refreshTokenController = require("../../Controllers/refreshTokenContoller");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
