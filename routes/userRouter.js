"use strict"

const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController.js");

userRouter.get("/users", userController.getUsers);

userRouter.get("/users/:id");

userRouter.post("/users");

userRouter.post("/users/:id/update")

userRouter.delete("/users");

module.exports = userRouter;