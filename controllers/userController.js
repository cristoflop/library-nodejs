"use strict"

const validator = require("express-validator");

async function getUsers(request, response) {
    response.status(200);
    let usuarios = await test();
    response.json(usuarios);
}

function test() {
    return {
        users: [
            {
                name: "cristofer"
            },
            {
                name: "juan"
            },
            {
                name: "luis"
            },
            {
                name: "mica"
            }
        ]
    };
}

module.exports = {
    getUsers: getUsers
}