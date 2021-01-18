"use strict"

const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const https = require('https');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const config = require("./config");
const url = `mongodb://${config.dbConfig.host}:${config.dbConfig.databaseServerPort}/${config.dbConfig.database}`;
const server = express();
const mongoose = require("mongoose");
const database = mongoose.connection;

const session = require("express-session");
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: null
});
server.use(middlewareSession);

mongoose.connect(
    url,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const loginRegisterRouter = require("./routes/loginRegisterRouter");
const userRouter = require("./routes/userRouter");
const bookRouter = require("./routes/bookRouter");

server.use(logger(config.logging));
server.use(express.json());
server.use(helmet());

server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());

server.use("/auth", loginRegisterRouter);
server.use('/api', bookRouter);
server.use('/api', userRouter);

server.use(middlewareNotFound);
server.use(middlewareServerError);

function middlewareNotFound(request, response) {
    response.status(404);
    response.json({
        message: `${request.url} not found`
    });
}

function middlewareServerError(error, request, response, next) {
    response.status(500);
    response.json(error);
}

database.on("error", function () {
    console.error("Error al conectar con la bd");
});

database.once("open", () => {
    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, server).listen(config.port, () => {
        console.log(`Servidor HTTPS arrancado en el puerto ${config.port}`)
    });
});