"use strict"

function bookMapper(book) {
    return {id: book._id, title: book.title }
}

function commentMapper(comment) {
    return {id: book._id, title: book.title }
}

function userMapper(user) {
    return {id: user._id, nick: user.nick, email: user.email}
}

module.exports = {userMapper, bookMapper, commentMapper}