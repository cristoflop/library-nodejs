"use strict"

const express = require('express');
const logger = require('morgan');
const app = express();

const config = require("./config");
const url = `mongodb://${config.dbConfig.host}:${config.dbConfig.databaseServerPort}/${config.dbConfig.database}aaa`;
const mongoose = require("mongoose");
mongoose.connect( // no hace falta el then
    url,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
const database = mongoose.connection;

const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session");
const MongoDBStore = mongoDBSession(session);
const sessionStore = new MongoDBStore({
    uri: url,
    collection: "sessions"
})

const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});
app.use(middlewareSession);

const userRouter = require("./routes/userRouter");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', userRouter);

app.use(middlewareNotFound);
app.use(middlewareServerError);

function middlewareNotFound(request, response) {
    let error = new Error("Not found")
    response.status(404);
    response.json(error);
}

function middlewareServerError(request, response) {
    let error = new Error("Server error")
    response.status(500);
    response.json(error);
    response.end();
}

database.on("error", function () {
    console.error("Error al conectar con la bd");
})

database.once("open", function () {
    app.listen(config.port, function (err) {
        if (err)
            console.error(`No se ha podido iniciar el servidor: ${err.message}`)
        else
            console.log(`Servidor arrancando en el puerto ${config.port}`)
    });
});
