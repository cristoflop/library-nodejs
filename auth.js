"use strict"

function authUser(request, response, next) {
    if (request.session.user == null) {
        response.status(403); // forbidden
        response.json({message: "You need to sign in"});
        return;
    }
    next();
}

module.exports = {
    authUser
}