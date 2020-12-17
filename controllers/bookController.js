"use strict"

const Book = require("../models/book");
const User = require("../models/user");

async function getBooks(request, response, next) {
    const books = await Book.find().populate("uploader");
    response.status(200);
    response.json(books)
}

async function saveBook(request, response, next) {
    try {
        const uploaderId = request.body.uploader;

        const user = await User.findById(uploaderId); // si no existe devuelve null
        if (user == null) {
            throw new Error("El usuario no existe");
        }

        const savedBook = await new Book({
            title: request.body.title,
            summary: request.body.summary,
            author: request.body.author,
            editorial: request.body.editorial,
            publishYear: request.body.publishYear,
            uploader: uploaderId
        }).save();

        response.status(200);
        response.json(savedBook);
    } catch (error) {
        next({
            message: error.message
        });
    }
}

async function getBook(request, response, next) {
    const id = request.params.id;
    try {
        const book = await Book.findById(id).populate("uploader");
        if (book == null) {
            throw new Error();
        }
        response.status(200);
        response.json(book);
    } catch (error) {
        next({
            message: `El libro con id '${id}' no existe`
        });
    }
}

module.exports = { getBooks, saveBook, getBook }