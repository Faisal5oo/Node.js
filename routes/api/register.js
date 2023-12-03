const express = require("express");
const router = express.Router();

const registerController = require("../../Controllers/registercontroller");

router.post("/", registerController.handleNewUser);

module.exports = router;
