"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    body: {type: String, required: true},
    rating: {type: Number, required: true},
    book: {type: mongoose.Schema.Types.ObjectId, ref: "books"},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "users"}
});

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;