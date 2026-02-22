const express = require("express");

const {showLogin, loginUser, logoutUser} = require("../controllers/authController.js");

const router = express.Router();

router.get("/login", showLogin);
router.post("/login", loginUser);
router.get("/logout", logoutUser)

module.exports = router;