const baseHtml = require("../helpers/baseHtml.js");
const getNavBar = require("../helpers/getNavBar.js");

function showProducts(req, res) {
    const category = req.query.category;
    res.send(baseHtml(category, getNavBar(), category));
}

module.exports = {showProducts};