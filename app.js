"use strict"

const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const config = require("./config");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session");
const MongoDBStore = mongoDBSession(session);
const sessionStore = new MongoDBStore({
    uri: `mongodb://${config.dbConfig.host}:${config.dbConfig.databaseServerPort}/${config.dbConfig.database}`,
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
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api', userRouter);

app.listen(config.port, function (err) {
    if (err)
        console.error(`No se ha podido iniciar el servidor: ${err.message}`)
    else
        console.log(`Servidor arrancando en el puerto ${config.port}`)
});
