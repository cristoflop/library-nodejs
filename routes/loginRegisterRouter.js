"use strict"

const express = require("express");
const loginRegisterRouter = express.Router();
const loginRegisterController = require("../controllers/loginRegisterController");

loginRegisterRouter.get("/login", loginRegisterController.login);

loginRegisterRouter.get("/register", loginRegisterController.register);

module.exports = loginRegisterRouter;