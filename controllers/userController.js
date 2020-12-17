"use strict"

const User = require("../models/user");
const ObjectId = require('mongoose').Types.ObjectId;

async function getUsers(request, response, next) {
    const users = await User.find();
    response.status(200);
    response.json(users.map(mapToDTO));
}

async function getUser(request, response, next) {
    const id = request.params.id;
    if (!ObjectId.isValid(id)) {
        response.status(400);
        response.json({message: `Not valid id`});
        return;
    }

    const user = await User.findById(id);
    if (user == null) {
        response.status(404);
        response.json({message: `User with id: ${id} not found`});
        return;
    }

    response.status(200);
    response.json(mapToDTO(user));
}

async function getUserByNick(request, response, next) {
    const nick = request.params.nick;
    const user = await User.findOne({nick});
    if (user == null) {
        response.status(404);
        response.json({message: `User called '${nick}' not found`});
        return;
    }
    response.status(200);
    response.json(mapToDTO(user));
}

async function saveUser(request, response, next) {
    const nick = request.body.nick;
    let user = await User.findOne({nick});
    if (user != null) {
        response.status(409);
        response.json({message: `User with nick '${nick}' already exists`});
        return;
    }

    user = await new User({
        nick: request.body.nick,
        email: request.body.email
    }).save();

    response.status(201);
    response.location(`${request.baseUrl + request.path}/${user._id}`);
    response.json();
}

async function updateUserEmail(request, response, next) {
    const email = request.body.email;
    const id = request.params.id;
    if (!ObjectId.isValid(id)) {
        response.status(400);
        response.json({message: `Not valid id`});
        return;
    }

    const user = await User.findByIdAndUpdate(id, {email});
    if (user == null) {
        response.status(404);
        response.json({message: `User with id ${id} not found`});
        return;
    }

    response.status(204);
    response.json();
}

async function deleteUser(request, response, next) {
    const id = request.params.id;
    if (!ObjectId.isValid(id)) {
        response.status(400);
        response.json({message: `Not valid id`});
        return;
    }

    const user = await User.findByIdAndDelete(id);
    if (user == null) {
        response.status(404);
        response.json({message: `User with id ${id} not found`});
        return;
    }

    response.status(204);
    response.json();
}

function mapToDTO(user) {
    return {id: user._id, nick: user.nick, email: user.email}
}

module.exports = {getUsers, getUser, getUserByNick, saveUser, updateUserEmail, deleteUser}