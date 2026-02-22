const {validCategories} = require("../models/Product.js");

function validateCategory(req, res, next, isDashboard) {
    if (req.query.category && validCategories.indexOf(req.query.category) === -1)
        res.redirect(isDashboard ? process.env.DASHBOARD_URL : process.env.PRODUCTS_URL);
    else
        next();
}

module.exports = {validateCategory};