"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    nick: {type: String, unique: true, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const User = mongoose.model('users', userSchema);

module.exports = User;