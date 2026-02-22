const express = require("express");
const cors = require("cors");
const path = require("node:path");

const methodOverride = require("method-override");
const session = require("express-session");

const productRoutes = require("./routes/productRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
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

//habilitar métodos adicionales para formularios
app.use(methodOverride("_method"));

//automatizar la gestión de sesiones con express-session
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: false
    }
}));

//dar acceso a la carpeta donde tenemos los estilos css
app.use(express.static(path.join(__dirname, "public")));

//rutas de producto
app.use("/", productRoutes);

//rutas de autenticación
app.use(process.env.AUTH_URL, authRoutes);

module.exports = app;