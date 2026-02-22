const express = require("express");

const {goToProductsPage, showProducts, showProductById, showNewProduct, createProduct, deleteProduct, showEditProduct, updateProduct} = require("../controllers/productController.js");
const {validateCategory} = require("../middlewares/productMiddleware.js");
const {checkLogin} = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", goToProductsPage);

router.get(process.env.PRODUCTS_URL, (req, res, next) => validateCategory(req, res, next, false), (req, res) => showProducts(req, res, false));
router.get(process.env.PRODUCTS_URL + "/:productId", (req, res) => showProductById(req, res, false));

router.get(process.env.DASHBOARD_URL + "/new", checkLogin, showNewProduct);

router.get(process.env.DASHBOARD_URL, checkLogin, (req, res, next) => validateCategory(req, res, next, true), (req, res) => showProducts(req, res, true));
router.get(process.env.DASHBOARD_URL + "/:productId", checkLogin, (req, res) => showProductById(req, res, true));

router.post(process.env.DASHBOARD_URL, checkLogin, createProduct);
router.delete(process.env.DASHBOARD_URL + "/:productId/delete", checkLogin, deleteProduct);
router.get(process.env.DASHBOARD_URL + "/:productId/edit", checkLogin, showEditProduct);
router.put(process.env.DASHBOARD_URL + "/:productId", checkLogin, updateProduct);

module.exports = router;