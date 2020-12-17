"use strict"

const User = require("../models/user");

async function getUsers(request, response, next) {
    const users = await User.find();
    response.status(200);
    response.json(users);
}

async function getUser(request, response, next) {
    const id = request.params.id;
    const user = await User.findById(id);
    if (user == null) {
        next({ message: `User with id: ${id} not found` });
        return;
    }

    response.status(200);
    response.json(user);
}

async function getUserByNick(request, response, next) {
    const nick = request.params.nick;
    try {
        const user = await User.findOne({
            nick: nick
        });
        if (user == null)
            throw new Error();
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
        const savedUser = await new User({
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
        const email = request.body.email;
        const id = request.params.id;
        const user = await User.findByIdAndUpdate(id,
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
        const id = request.body.id;
        const user = await User.findByIdAndDelete(id);
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