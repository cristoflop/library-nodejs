"use strict"

const validator = require("express-validator");

var users = [
    {
        name: "cristofer",
        id: 1
    },
    {
        name: "juan",
        id: 2
    },
    {
        name: "luis",
        id: 3
    },
    {
        name: "mica",
        id: 4
    }
];

async function getUsers(request, response, next) {
    response.status(200);
    let users = await testUsers();
    response.json(users);
}

async function getUser(request, response, next) {
    let user = await testUser(request.params.id);
    if (user === undefined) {
        response.status(404);
        next();
    } else {
        response.status(200);
        response.json(user);
    }
}

function testUser(id) {
    let list = users.filter(user => user.id == id); // solo nos interesa comparar por valor, no por tipo
    let user = new Set(list);
    return user.values().next().value;
}

function testUsers() {
    return users;
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser
}