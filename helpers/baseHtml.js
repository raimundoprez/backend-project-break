const siteName = "Super Vaqueros";

function baseHtml(title, headerContent, mainContent) {
    const html = `
        <!DOCTYPE html>
        <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <title>${title ? (title + " | " + siteName) : siteName}</title>
                <link rel="icon" href="/icons/site_icon.png" type="image/png">

                <link rel="stylesheet" href="/css/reset.css">
                <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
                <header>
                    ${headerContent}
                </header>

                <main>
                    ${mainContent}
                </main>
            </body>
        </html>
    `;

    return html;
}

module.exports = baseHtml;