function getProductDetail(product) {
    const html = `
        <div class="product-card product-detail">
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}"/>
            <p>${product.description}</p>
            <p>${product.price}€</p>
            <p>Categoría: ${product.category}</p>
            <p>Talla: ${product.size}</p>
        </div>
    `;

    return html;
}

module.exports = getProductDetail;