"use strict"

const express = require("express");
const bookRouter = express.Router();
const bookController = require("../controllers/bookController");

bookRouter.get("/books", bookController.getBooks);

bookRouter.post("/books", bookController.saveBook);

bookRouter.get("/books/:id", bookController.getBook);

module.exports = bookRouter;