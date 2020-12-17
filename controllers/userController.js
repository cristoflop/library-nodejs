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
        next({message: `User with id: ${id} not found`});
        return;
    }

    response.status(200);
    response.json(user);
}

async function getUserByNick(request, response, next) {
    const nick = request.params.nick;
    const user = await User.findOne({
        nick
    });
    if (user == null) {
        next({message: `User called ${nick} not found`});
        return;
    }
    response.status(200);
    response.json(user);
}

async function saveUser(request, response, next) {
    const savedUser = await new User({
        nick: request.body.nick,
        email: request.body.email
    }).save();
    response.status(200);
    response.json(savedUser);
}

async function updateUserEmail(request, response, next) {
    const email = request.body.email;
    const id = request.params.id;
    const user = await User.findByIdAndUpdate(id, {email});
    response.status(200);
    response.json(user);
}

async function deleteUser(request, response, next) {
    const id = request.body.id;
    const user = await User.findByIdAndDelete(id);
    response.status(200);
    response.json(user);
}

module.exports = { getUsers, getUser, getUserByNick, saveUser, updateUserEmail, deleteUser }