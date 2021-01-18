"use strict"

const User = require("../models/user");
const userMapper = require("./mappers").userMapper

async function login(request, response) {
    const nick = request.body.nick;
    const password = request.body.password;
    let user = await User.findOne({nick, password});
    if (user == null) {
        response.status(400);
        response.json({message: `Authentication error, check nick or password`});
        return;
    }
    request.session.user = userMapper(user); // loged
    response.status(200);
    response.location(`${request.baseUrl + request.path}/${user._id}`);
    response.json({message: `Authentication successful`});
}

async function register(request, response) {
    const nick = request.body.nick;
    const password = request.body.password;
    let user = await User.findOne({nick});
    if (user != null) {
        response.status(409);
        response.json({message: `User with nick '${nick}' already exists`});
        return;
    }

    user = await new User({
        nick: nick,
        email: request.body.email,
        password: password
    }).save();

    response.status(201);
    response.location(`${request.baseUrl + request.path}/${user._id}`);
    response.json({message: `Register successful`});
}

function logout(request, response) {
    request.session.user = null;
    response.status(201);
    response.json({message: "Logout successful"});
}

module.exports = {
    login,
    register,
    logout
}