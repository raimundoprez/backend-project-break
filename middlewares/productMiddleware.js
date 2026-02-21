const {validCategories} = require("../models/Product.js");

function validateCategory(req, res, next) {
    if (req.query.category && validCategories.indexOf(req.query.category) === -1)
        res.redirect(process.env.PRODUCTS_URL);
    else
        next();
}

module.exports = {validateCategory};