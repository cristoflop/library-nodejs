"use strict"

const validator = require("express-validator");

function getUsers(request, response) {
    response.sendStatus(200);
    response.send("usuarios", ["cristofer", "juan", "luis", "mica"]);
}

module.exports = {
    getUsers: getUsers
}