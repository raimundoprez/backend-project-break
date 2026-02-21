function getProductsCards(products) {
    return products.map(product => {
        return `
            <div class="product-card">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}"/>
                <a href="${process.env.PRODUCTS_URL + "/" + product._id}">Ver</a>
            </div>
        `;
    });
}

module.exports = getProductsCards;