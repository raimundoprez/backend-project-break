const {validCategories, validSizes} = require("../models/Product");

function getProductForm(product) {
    const title = product ? `<h1>Editar Producto: ${product.name}</h1>` : "<h1>Nuevo Producto</h1>";
    const action = product ? (process.env.DASHBOARD_URL + "/" + product._id + "?_method=PUT") : (process.env.DASHBOARD_URL + "?_method=POST");

    const defaultName = product?.name || "";
    const defaultDescription = product?.description || "";
    const defaultImage = product?.image || "";
    const defaultPrice = product?.price || "";

    const buttonText = product ? "Editar producto" : "Crear producto";

    const html = `
        ${title}

        <form class="data-form" action="${action}" method="POST">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" placeholder="Nombre del producto" minLength="2" maxLength="150" required value="${defaultName}">

            <label for="description">Descripción:</label>
            <textarea id="description" name="description" placeholder="Descripción del producto" minLength=0 maxLength=500 required>${defaultDescription}</textarea>

            <label for="image">Imagen:</label>
            <input type="url" id="image" name="image" placeholder="URL de la imagen" minLength="0" maxLength="500" required value="${defaultImage}">

            <label for="price">Precio:</label>
            <input type="number" id="price" name="price" placeholder="Precio del producto" min="0.00" max="100000.00" step="0.01" required value="${defaultPrice}">

            <label for="category">Categoría:</label>
            <select id="category" name="category" required>
                ${validCategories.map(category => `<option value="${category}" ${product?.category === category ? "selected" : ""}>${category}</option>`).join("")}
            </select>

            <label for="size">Tamaño:</label>
            <select id="size" name="size" required>
                ${validSizes.map(size => `<option value="${size}" ${product?.size === size ? "selected" : ""}>${size}</option>`).join("")}
            </select>

            <button type="submit">${buttonText}</button>
        </form>
    `;

    return html;
}

module.exports = getProductForm;