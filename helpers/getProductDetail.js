function getProductDetail(product, isDashboard) {
    const html = `
        <div class="product-card product-detail">
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}"/>
            <p>${product.description}</p>
            <p>${product.price}€</p>
            <p>Categoría: ${product.category}</p>
            <p>Talla: ${product.size}</p>

            ${
                isDashboard ?
                `<form action="${process.env.DASHBOARD_URL}/${product._id}/edit" method="GET">
                    <button type="submit">Editar</button>
                </form>

                <form action="${process.env.DASHBOARD_URL}/${product._id}/delete?_method=DELETE" method="POST">
                    <button type="submit">Borrar</button>
                </form>`
                : ""
            }
        </div>
    `;

    return html;
}

module.exports = getProductDetail;