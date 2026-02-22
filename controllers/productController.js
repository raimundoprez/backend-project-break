const baseHtml = require("../helpers/baseHtml.js");
const getNavBar = require("../helpers/getNavBar.js");
const getProductForm = require("../helpers/getProductForm.js");
const getProductsCards = require("../helpers/getProductCards.js");
const getProductDetail = require("../helpers/getProductDetail.js");
const getProductsList = require("../helpers/getProductsList.js");

const {validCategories, validSizes, Product} = require("../models/Product.js");

function goToProductsPage(_, res) {
    res.redirect(process.env.PRODUCTS_URL);
}

async function showProducts(req, res, isDashboard) {
    const category = req.query.category;
    const searchObject = category ? {category} : undefined;
    const sectionTitle = category ? category : process.env.PRODUCTS_NAME;

    try {
        const products = await Product.find(searchObject);
        const cards = getProductsCards(products, isDashboard);

        res.send(baseHtml(category, getNavBar(isDashboard), getProductsList(sectionTitle, cards)));
    }
    catch(error) {
        console.error("Error leyendo la lista de productos de la categoría " + category, error);
        res.send(baseHtml(category, getNavBar(isDashboard), getProductsList(sectionTitle, [])));
    }
}

async function showProductById(req, res, isDashboard) {
    const id = req.params.productId;

    try {
        const product = await Product.findById(id);

        if (product) {
            res.send(baseHtml(product.name, getNavBar(isDashboard), getProductDetail(product, isDashboard)));
            return;
        }
    }
    catch(error) {
        console.error("Error obteniendo los detalles del producto " + id, error);
    }

    res.redirect(isDashboard ? process.env.DASHBOARD_URL : process.env.PRODUCTS_URL);
}

function showNewProduct(_, res) {
    res.send(baseHtml("Nuevo Producto", getNavBar(true), getProductForm()));
}

function validateProductParams(name, description, image, category, size, price) {
    if (typeof name !== "string" || name.length < 2 || name.length > 150) return;
    if (typeof description !== "string" || description.length > 500) return;
    if (typeof image !== "string" || image.length > 500) return;
    if (typeof category !== "string" || validCategories.indexOf(category) === -1) return;
    if (typeof size !== "string" || validSizes.indexOf(size) === -1) return;
    if (typeof price !== "string") return;

    price = Number.parseFloat(price);
    if (Number.isNaN(price) || price < 0.0 || price > 100000.0) return;

    return {name, description, image, category, size, price};
}

async function createProduct(req, res) {
    const {name, description, image, category, size, price} = req.body || {};
    const data = validateProductParams(name, description, image, category, size, price);

    if (data) {
        try {
            const product = await Product.create(data);
            res.redirect(process.env.DASHBOARD_URL + "/" + product._id);
            return;
        }
        catch(error) {
            console.error("Error creando un nuevo producto con los datos: " + JSON.stringify(data), error);
        }
    }

    res.redirect(process.env.DASHBOARD_URL);
}

async function deleteProduct(req, res) {
    const id = req.params.productId;

    try {
        await Product.findByIdAndDelete(id);
    }
    catch(error) {
        console.error("Error borrando el producto con id: " + id, error);
    }

    res.redirect(process.env.DASHBOARD_URL);
}

async function showEditProduct(req, res) {
    const id = req.params.productId;

    try {
        const product = await Product.findById(id);

        if (product) {
            res.send(baseHtml("Editar Producto", getNavBar(true), getProductForm(product)));
            return;
        }
    }
    catch(error) {
        console.error("Error mostrando la vista del producto con id: " + id, error);
    }

    res.redirect(process.env.DASHBOARD_URL);
}

async function updateProduct(req, res) {
    const id = req.params.productId;

    const {name, description, image, category, size, price} = req.body || {};
    const data = validateProductParams(name, description, image, category, size, price);

    if (data) {
        try {
            await Product.findByIdAndUpdate(id, data);
            res.redirect(process.env.DASHBOARD_URL + "/" + id);
            return;
        }
        catch(error) {
            console.error("Error actualizando el producto " + id + " con los datos: " + JSON.stringify(data), error);
        }
    }

    res.redirect(process.env.DASHBOARD_URL);
}

module.exports = {goToProductsPage, showProducts, showProductById, showNewProduct, createProduct, deleteProduct, showEditProduct, updateProduct};