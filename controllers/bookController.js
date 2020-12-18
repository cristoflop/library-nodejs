"use strict"

const Book = require("../models/book");
const User = require("../models/user");
const Comment = require("../models/comment");
const ObjectId = require('mongoose').Types.ObjectId;
const bookMapper = require("./mappers").bookMapper;

async function getBooks(request, response, next) {
    const books = await Book.find().populate("uploader");
    response.status(200);
    response.json(books.map(bookMapper));
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

    const mappedComments = comments.map(c => {
        return {id: c._id, body: c.body, email: c.author.email, nick: c.author.nick}
    })

    response.status(200);
    response.json({...bookMapper(book), comments: mappedComments});
}

async function publishComment(request, response, next) {
    const bookId = request.params.bookId;

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

    const nick = request.body.nick;
    const user = await User.findOne({nick});
    if (user == null) {
        response.status(404);
        response.json({message: `User with nick ${nick} not found`});
        return;
    }

    await new Comment({
        body: request.body.body,
        rating: request.body.rating,
        book: bookId,
        author: user._id
    }).save();

    response.status(201);
    response.location(`${request.baseUrl + request.path}/${bookId}`);
    response.json();
}

async function deleteComment(request, response, next) {
    const bookId = request.params.bookId;

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

    const commentId = request.params.commentId;
    const comment = await Comment.findByIdAndDelete(commentId);
    if (comment == null) {
        response.status(404);
        response.json({message: `Comment with id ${commentId} not found`});
        return;
    }

    response.status(204);
    response.json();
}

module.exports = {getBooks, saveBook, getBook, publishComment, deleteComment}