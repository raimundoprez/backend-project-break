const {validCategories} = require("../models/Product.js");

const allProductsName = "Productos";
const allProductsURL = "/products";

function renderCategories(categories) {
    const allProductsCategory = `<li><a href="${allProductsURL}">${allProductsName}</a></li>`;

    categories = categories.map(category => {
        const params = new URLSearchParams({category});
        const url = allProductsURL + "?" + params.toString();
        
        return `<li><a href="${url}">${category}</a></li>`;
    });

    return allProductsCategory + categories.join("");
}

function getNavBar() {
    const html = `
        <nav>
            <ul>
                ${renderCategories(validCategories)}
            </ul>
        </nav>
    `;

    return html;
}

module.exports = getNavBar;