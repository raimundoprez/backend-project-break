const express = require("express");

const {showProducts, showProductById} = require("../controllers/productController.js");
const {validateCategory} = require("../middlewares/productMiddleware.js");

const router = express.Router();

router.get(process.env.PRODUCTS_URL, validateCategory, showProducts);
router.get(process.env.PRODUCTS_URL + "/:productId", showProductById);

module.exports = router;