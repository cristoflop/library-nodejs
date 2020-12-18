"use strict"

function bookMapper(book) {
    return {id: book._id, title: book.title}
}

function commentMapper(comment) {
    return {id: comment._id, body: comment.body, rating: comment.rating, author: comment.author.nick, book: comment.book}
}

function userMapper(user) {
    return {id: user._id, nick: user.nick, email: user.email}
}

module.exports = {userMapper, bookMapper, commentMapper}