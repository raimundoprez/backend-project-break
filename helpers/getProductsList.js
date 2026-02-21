function getProductsList(title, cards) {
    const html = `
        <h1>${title}</h1>
        <ul class="products-list">
            ${cards.map(card => `<li>${card}</li>`).join("")}
        </ul>
    `;

    return html;
}

module.exports = getProductsList;