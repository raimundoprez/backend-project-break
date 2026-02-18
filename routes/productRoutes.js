const express = require("express");

const {showProducts} = require("../controllers/productController.js");
const {validateCategory} = require("../middlewares/productMiddleware.js");

const router = express.Router();

router.route("/products").get(validateCategory, showProducts);

module.exports = router;