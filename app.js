"use strict"

const express = require('express');
const logger = require('morgan');
const config = require("./config");
const url = `mongodb://${config.dbConfig.host}:${config.dbConfig.databaseServerPort}/${config.dbConfig.database}`;
const app = express();
const mongoose = require("mongoose");
const database = mongoose.connection;

mongoose.connect( // no hace falta el then
    url,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const userRouter = require("./routes/userRouter");
const bookRouter = require("./routes/bookRouter")

app.use(logger(config.logging));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', userRouter);
app.use('/api', bookRouter);

app.use(middlewareNotFound);
app.use(middlewareServerError);

function middlewareNotFound(request, response) {
    response.status(404);
    response.json({
        message: `${request.url} not found`
    });
}

function middlewareServerError(error, request, response, next) {
    // importante poner los 4 params para llamar al middleware con next(error)
    response.status(500);
    response.json(error);
}

database.on("error", function () {
    console.error("Error al conectar con la bd");
});

database.once("open", () => {
    app.listen(config.port, err => {
        if (err)
            console.error(`No se ha podido iniciar el servidor: ${err.message}`)
        else
            console.log(`Servidor arrancado en el puerto ${config.port}`)
    });
});
