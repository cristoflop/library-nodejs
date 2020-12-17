"use strict"

const Book = require("../models/book");
const User = require("../models/user");
const Comment = require("../models/comment");
const ObjectId = require('mongoose').Types.ObjectId;
const bookMapper = require("./mappers").bookMapper;
const commentMapper = require("./mappers").commentMapper;

async function getBooks(request, response, next) {
    const books = await Book.find().populate("uploader");
    response.status(200);
    response.json(books.map(book => bookMapper(book)));
}

async function saveBook(request, response, next) {
    const uploader = request.body.uploader;

    const user = await User.findOne({nick: uploader});

    if (user == null) {
        response.status(404);
        response.json({message: `User with nick '${uploader}' not found`});
        return;
    }

    const book = await new Book({
        title: request.body.title,
        summary: request.body.summary,
        author: request.body.author,
        editorial: request.body.editorial,
        publishYear: request.body.publishYear,
        uploader: user._id
    }).save();

    response.status(201);
    response.location(`${request.baseUrl + request.path}/${book._id}`);
    response.json();
}

async function getBook(request, response, next) {
    const id = request.params.id;

    if (!ObjectId.isValid(id)) {
        response.status(400);
        response.json({message: `Not valid id`});
        return;
    }

    const book = await Book.findById(id).populate("uploader");

    if (book == null) {
        response.status(404);
        response.json({message: `Book with id ${id} not found`});
        return;
    }

    const comments = await Comment.find({
        book: id
    }).populate("author");

    response.status(200);
    response.json({book: book, comments: comments});
}

async function publishComment(request, response, next) {
    const bookId = request.params.id;

    if (!ObjectId.isValid(bookId)) {
        response.status(400);
        response.json({message: `Not valid id`});
        return;
    }

    const book = await Book.findById(bookId);
    if (book == null) {
        response.status(404);
        response.json({message: `Book with id ${bookId} not found`});
        return;
    }

    const authorId = request.body.author;
    const user = await User.findById(authorId);
    if (user == null) {
        response.status(404);
        response.json({message: `User with id ${authorId} not found`});
        return;
    }

    const comment = (await new Comment({
        body: request.body.body,
        rating: request.body.rating,
        book: bookId,
        author: authorId
    }).save()).populate("uploader");

    response.status(200);
    response.json(commentMapper(comment));
}

async function deleteComment(request, response, next) {
    const bookId = request.params.id;

    if (!ObjectId.isValid(bookId)) {
        response.status(400);
        response.json({message: `Not valid id`});
        return;
    }

    const book = await Book.findById(bookId);
    if (book == null) {
        response.status(404);
        response.json({message: `Book with id ${bookId} not found`});
        return;
    }

    const commentId = request.body.id;
    const comment = await Comment.findByIdAndDelete(commentId).populate("uploader");

    response.status(200);
    response.json(commentMapper(comment));
}

module.exports = {getBooks, saveBook, getBook, publishComment, deleteComment}