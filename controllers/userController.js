"use strict"

const validator = require("express-validator");

const User = require("../models/user");

async function getUsers(request, response, next) {
    response.status(200);
    let users = await testUsers();
    response.json(users);
}

async function getUser(request, response, next) {
    let user = await testUser(request.params.id);
    if (user === undefined) {
        next();
    } else {
        response.status(200);
        response.json(user);
    }
}

async function saveUser(request, response, next) {
    let userToSave = new User({
        nick: "cristofer",
        email: "cristofer@cristofer.com"
    });
    let user = await userToSave.save();
    if (user === undefined) {
        next();
    } else {
        response.status(200);
        response.json(user);
    }
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    saveUser: saveUser
}