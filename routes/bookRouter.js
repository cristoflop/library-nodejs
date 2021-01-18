"use strict"

const express = require("express");
const bookRouter = express.Router();
const bookController = require("../controllers/bookController");

const auth = require("../auth").authUser;

bookRouter.get("/books", bookController.getBooks);

bookRouter.use(auth); // lo que esta por debajo de esta declaracion pasa por el middleware de autenticacion (importante el orden en app.js)

bookRouter.post("/books", auth, bookController.saveBook);

bookRouter.get("/books/:id", bookController.getBook);

bookRouter.post("/books/:bookId/comments", bookController.publishComment);

bookRouter.delete("/books/:bookId/comments/:commentId", bookController.deleteComment);

module.exports = bookRouter;