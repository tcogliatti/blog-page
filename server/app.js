// fichero de configuracion de EXPRESS

const express = require("express");
const { API_VERSION } = require("./constants");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Import routings
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user")

// Configure body parser: para que el servidor pueda recibir JSON en el body del HTTP request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure static folder: las statics son carpetas a la que se puede acceder desde el lado del cliente
app.use(express.static("uploads"));

// Configure HTTP - CORS: headers de 
app.use(cors());

// Configure Routings
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)

module.exports = app;