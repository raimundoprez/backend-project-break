const {validCategories} = require("../models/Product.js");

function renderCategories(categories, isDashboard) {
    const baseURL = isDashboard ? process.env.DASHBOARD_URL : process.env.PRODUCTS_URL;
    const productsName = process.env.PRODUCTS_NAME;
    const productsCategory = `<li><a href="${baseURL}">${productsName}</a></li>`;

    categories = categories.map(category => {
        const params = new URLSearchParams({category});
        const url = baseURL + "?" + params.toString();
        
        return `<li><a href="${url}">${category}</a></li>`;
    });

    let newProductCategory = "";

    if (isDashboard) {
        const newProductPage = process.env.DASHBOARD_URL + "/new";
        const newProductName = "Nuevo Producto";
        newProductCategory = `<li><a href="${newProductPage}">${newProductName}</a></li>`;
    }

    const authPage = process.env.AUTH_URL + "/" + (isDashboard ? "logout" : "login");
    const authName = isDashboard ? "Logout" : "Login";
    const authCategory = `<li><a href="${authPage}">${authName}</a></li>`;

    return productsCategory + categories.join("") + newProductCategory + authCategory;
}

function getNavBar(isDashboard) {
    const html = `
        <nav>
            <ul>
                ${renderCategories(validCategories, isDashboard)}
            </ul>
        </nav>
    `;

    return html;
}

module.exports = getNavBar;