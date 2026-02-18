const express = require("express");
const cors = require("cors");
const path = require("node:path");

const productRoutes = require("./routes/productRoutes.js");
const dbConnect = require("./config/db.js");

//intentamos conectar a BBDD y, si falla la conexión, la excepción que se lanza aborta el programa
dbConnect();

const app = express();

//habilitar cors para todas las rutas
app.use(cors());

//habilitar procesamiento de formularios
app.use(express.urlencoded({extended: true}));

//habilitar procesamiento de JSON
app.use(express.json());

//dar acceso a la carpeta donde tenemos los estilos css
app.use(express.static(path.join(__dirname, "public")));

//rutas de producto
app.use("/", productRoutes);

module.exports = app;