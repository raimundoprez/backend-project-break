const {validCategories} = require("../models/Product.js");

function renderCategories(categories) {
    const allProductsCategory = `<li><a href="${process.env.PRODUCTS_URL}">${process.env.PRODUCTS_NAME}</a></li>`;

    categories = categories.map(category => {
        const params = new URLSearchParams({category});
        const url = process.env.PRODUCTS_URL + "?" + params.toString();
        
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