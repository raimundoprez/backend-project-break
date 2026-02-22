const validateProductParams = require("../helpers/validateProductParams.js");
const {Product} = require("../models/Product.js");

async function getProducts(req, res) {
    const category = req.query.category;
    const searchObject = category ? {category} : undefined;

    try {
        const products = await Product.find(searchObject);
        res.json(products);
    }
    catch(error) {
        console.error("[API] Error obteniendo la lista de productos.", error);
        res.status(500).json({error: "Error obteniendo la lista de productos."});
    }
}

async function getProductById(req, res) {
    const id = req.params.productId;

    try {
        const product = await Product.findById(id);

        if (!product)
            res.status(404).json({error: "Producto no encontrado."});
        else
            res.json(product);
    }
    catch(error) {
        console.error("[API] Error obteniendo el producto con id: " + id, error);
        res.status(500).json({error: "Error obteniendo el producto solicitado."});
    }
}

async function createProduct(req, res) {
    const {name, description, image, category, size, price} = req.body || {};
    const data = validateProductParams(name, description, image, category, size, price);

    if (data) {
        try {
            const product = await Product.create(data);
            res.status(201).json(product);
        }
        catch(error) {
            console.error("[API] No se pudo crear un producto con los datos: " + JSON.stringify(data), error);
            res.status(500).json({error: "Error creando el producto."});
        }
    }
    else {
        res.status(400).json({error: "Recibidos parámetros incorrectos."});
    }
}

async function updateProduct(req, res) {
    const id = req.params.productId;

    const {name, description, image, category, size, price} = req.body || {};
    const data = validateProductParams(name, description, image, category, size, price);

    if (data) {
        try {
            const product = await Product.findByIdAndUpdate(id, data, {new: true});
            res.json(product);
        }
        catch(error) {
            console.error("[API] No se pudo actualizar el producto " + id + " con los datos: " + JSON.stringify(data), error);
            res.status(500).json({error: "Error actualizando el producto."});
        }
    }
    else {
        res.status(400).json({error: "Recibidos parámetros incorrectos."});
    }
}

async function deleteProduct(req, res) {
    const id = req.params.productId;

    try {
        await Product.findByIdAndDelete(id);
        res.send();
    }
    catch(error) {
        console.error("[API] Error borrando el producto con id: " + id, error);
        res.status(500).json({error: "Error borrando el producto."});
    }
}

function loginUser(req, res) {
    const username = req.body?.username;
    const password = req.body?.password;

    if ((!username || username !== process.env.AUTH_USERNAME) ||
    (!password || password !== process.env.AUTH_PASSWORD))
    {
        res.status(400).json({error: "Usuario o contraseña incorrectos."});
    }
    else {
        req.session.regenerate((err) => {
            if (err) {
                console.error("[API] Error creando una sesión de admin.", err);
                res.status(500).json({error: "No se pudo crear la sesión de admin."});
            }
            else {
                req.session.initialized = true;
                res.send();
            }
        });
    }
}

function logoutUser(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error("[API] Error cerrando sesión.", err);
            res.status(500).json({error: "Error cerrando sesión."});
        }
        else {
            res.clearCookie("connect.sid");
            res.send();
        }
    });
}

module.exports = {getProducts, getProductById, createProduct, updateProduct, deleteProduct, loginUser, logoutUser};