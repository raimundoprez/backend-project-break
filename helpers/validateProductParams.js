const {validCategories, validSizes} = require("../models/Product.js");

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

module.exports = validateProductParams;