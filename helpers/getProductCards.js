function getProductsCards(products, isDashboard) {
    return products.map(product => {
        return `
            <div class="product-card">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}"/>
                <a href="${(isDashboard ? process.env.DASHBOARD_URL : process.env.PRODUCTS_URL) + "/" + product._id}">Ver</a>
            </div>
        `;
    });
}

module.exports = getProductsCards;