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

async function getUserByNick(request, response, next) {
    let nick = request.params.nick;
    try {
        let user = await User.findOne({
            nick: nick
        })
        response.status(200);
        response.json(user);
    } catch (error) {
        next({
            message: `User called ${nick} not found`
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

async function updateUserEmail(request, response, next) {
    try {
        let email = request.body.email;
        let id = request.params.id;
        let user = await User.findByIdAndUpdate(id,
            {
                email: email
            });
        response.status(200);
        response.json(user);
    } catch (error) {
        next({
            message: error.message,
            details: error
        });
    }
}

async function deleteUser(request, response, next) {
    try {
        let id = request.body.id;
        let user = await User.findByIdAndDelete(id);
        response.status(200);
        response.json(user);
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
    getUserByNick: getUserByNick,
    saveUser: saveUser,
    updateUserEmail: updateUserEmail,
    deleteUser: deleteUser
}