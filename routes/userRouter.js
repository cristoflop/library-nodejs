"use strict"

const express = require("express");
const userRouter = express.Router();

userRouter.get("/users");

userRouter.get("/users/:id");

userRouter.post("/users");

userRouter.post("/users/:id/update")

userRouter.delete("/users");

module.exports = userRouter;