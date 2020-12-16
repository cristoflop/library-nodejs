"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({ // el id lo añade auto
    title: {type: String, required: true},
    summary: {type: String, required: true},
    author: {type: String, required: true},
    editorial: {type: String, required: true},
    publishYear: {type: Number, required: true},
    uploader: {type: mongoose.Schema.Types.ObjectId, ref: "users"}
});

const Book = mongoose.model('books', bookSchema);

module.exports = Book;