"use strict"

const User = require("../models/user");

async function getUsers(request, response, next) {
    let users = await User.find();
    response.status(200);
    response.json(users);
}

async function getUser(request, response, next) {
    let id = request.params.id;
    try {
        let user = await User.findById(id);
        response.status(200);
        response.json(user);
    } catch (error) {
        next({
            message: `User with id: ${id} not found`
        });
    }
}

async function saveUser(request, response, next) {
    try {
        let savedUser = await new User({
            nick: request.body.nick,
            email: request.body.email
        }).save();
        response.status(200);
        response.json(savedUser);
    } catch (error) {
        next({
            message: error.message,
            details: error
        });
    }
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    saveUser: saveUser
}