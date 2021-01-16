"use strict"

const express = require("express");
const loginRegisterRouter = express.Router();

loginRegisterRouter.use(middlewareAccessControl);

loginRegisterRouter.post("/login", (request, response) => {
    // login
});

loginRegisterRouter.post("/register", (request, response) => {
    // registro
});

function middlewareAccessControl(request, response) {
    // depende de donde se use esta funcion se podra acceder a los metodos de otros router o no
}

module.exports = loginRegisterRouter;