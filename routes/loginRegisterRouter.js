"use strict"

const express = require("express");
const loginRegisterRouter = express.Router();
const loginRegisterController = require("../controllers/loginRegisterController");

loginRegisterRouter.post("/login", loginRegisterController.login);

loginRegisterRouter.post("/register", loginRegisterController.register);

module.exports = loginRegisterRouter;