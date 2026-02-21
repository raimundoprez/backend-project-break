const baseHtml = require("../helpers/baseHtml.js");
const getNavBar = require("../helpers/getNavBar.js");
const getProductsCards = require("../helpers/getProductCards.js");
const getProductDetail = require("../helpers/getProductDetail.js");
const getProductsList = require("../helpers/getProductsList.js");

const {Product} = require("../models/Product.js");

async function showProducts(req, res) {
    const category = req.query.category;
    const searchObject = category ? {category} : undefined;
    const sectionTitle = category ? category : process.env.PRODUCTS_NAME;

    try {
        const products = await Product.find(searchObject);
        const cards = getProductsCards(products);

        res.send(baseHtml(category, getNavBar(), getProductsList(sectionTitle, cards)));
    }
    catch(error) {
        console.error("Error leyendo la lista de productos de la categoría " + category, error);
        res.send(baseHtml(category, getNavBar(), getProductsList(sectionTitle, [])));
    }
}

async function showProductById(req, res) {
    const id = req.params.productId;

    try {
        const product = await Product.findById(id);

        if (product)
            res.send(baseHtml(product.name, getNavBar(), getProductDetail(product)));
        else
            res.redirect(process.env.PRODUCTS_URL);
    }
    catch(error) {
        console.error("Error obteniendo los detalles del producto " + id, error);
        res.redirect(process.env.PRODUCTS_URL);
    }
}

module.exports = {showProducts, showProductById};