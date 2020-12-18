"use strict"

const express = require("express");
const bookRouter = express.Router();
const bookController = require("../controllers/bookController");

bookRouter.get("/books", bookController.getBooks);

bookRouter.post("/books", bookController.saveBook);

bookRouter.get("/books/:id", bookController.getBook);

bookRouter.post("/books/:bookId/comments", bookController.publishComment);

bookRouter.delete("/books/:bookId/comments/:commentId", bookController.deleteComment);

module.exports = bookRouter;