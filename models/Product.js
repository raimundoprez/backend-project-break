const mongoose = require("mongoose");

const validCategories = ["Camisetas", "Pantalones", "Zapatos", "Accesorios"];
const validSizes = ["XS", "S", "M", "L", "XL"];

const productSchema = new mongoose.Schema({
    name: {type: String, minLength: 2, maxLength: 150, unique: true, required: true},
    description: {type: String, minLength: 0, maxLength: 500, required: true},
    image: {type: String, minLength: 0, maxLength: 500, required: true},
    category: {type: String, enum: validCategories, required: true},
    size: {type: String, enum: validSizes, required: true},
    price: {type: Number, min: 0.0, max: 100000.0, required: true}
});

const Product = mongoose.model("Product", productSchema);

module.exports = {Product, validCategories, validSizes};