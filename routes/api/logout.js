const express = require("express");
const router = express.Router();

const logoutcontroller = require("../../Controllers/logoutController");

router.get("/", logoutcontroller.handleLogout);

module.exports = router;
