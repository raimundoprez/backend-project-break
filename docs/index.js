const basicInfo = require("./basicInfo.js");
const products = require("./products.js");
const components = require("./components.js");

module.exports = {
    ...basicInfo,
    ...products,
    ...components
};