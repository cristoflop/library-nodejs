"use strict"

const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController.js");

userRouter.get("/users", userController.getUsers);

userRouter.post("/users", userController.saveUser);

userRouter.delete("/users/:id", userController.deleteUser);

userRouter.get("/users/:id", userController.getUser);

userRouter.patch("/users/:id", userController.updateUserEmail);

module.exports = userRouter;