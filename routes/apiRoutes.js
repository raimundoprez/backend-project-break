const express = require("express");

const {getProducts, getProductById, createProduct, updateProduct, deleteProduct, loginUser, logoutUser} = require("../controllers/apiController.js");
const {validateCategory, checkLogin} = require("../middlewares/apiMiddleware.js");

const router = express.Router();

router.get(process.env.PRODUCTS_URL, validateCategory, getProducts); //Obtener todos los productos
router.get(process.env.PRODUCTS_URL + "/:productId", getProductById); //Obtener un producto en concreto
router.post(process.env.PRODUCTS_URL, checkLogin, createProduct); //crear un nuevo producto (requiere login)
router.put(process.env.PRODUCTS_URL + "/:productId", checkLogin, updateProduct); //actualizar producto (requiere login)
router.delete(process.env.PRODUCTS_URL + "/:productId", checkLogin, deleteProduct); //borrar producto (requiere login)

router.post(process.env.AUTH_URL, loginUser); //hace login de un usuario
router.get(process.env.AUTH_URL, logoutUser); //hace logout de un usuario

module.exports = router;