const {validCategories} = require("../models/Product.js");

function validateCategory(req, res, next) {
    if (req.query.category && validCategories.indexOf(req.query.category) === -1)
        res.status(400).json({error: "La categoría seleccionada no existe."});
    else
        next();
}

function checkLogin(req, res, next) {
    if (!req.session.initialized)
        res.status(401).json({error: "No se puede acceder a esta ruta sin autorización."});
    else
        next();
}

module.exports = {validateCategory, checkLogin};