"use strict"

const express = require("express");
const loginRegisterRouter = express.Router();
const loginRegisterController = require("../controllers/loginRegisterController");

const auth = require("../auth").authUser;

loginRegisterRouter.post("/login", loginRegisterController.login);

loginRegisterRouter.post("/register", loginRegisterController.register);

loginRegisterRouter.get("/logout", auth, loginRegisterController.logout);

module.exports = loginRegisterRouter;