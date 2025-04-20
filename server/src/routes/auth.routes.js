const express = require("express");
const auth = require("../controllers/auth.controller");
const authRoutes = express.Router();

authRoutes.route("/signup").post(auth.signup);
authRoutes.route("/login").post(auth.login);

module.exports = authRoutes;
