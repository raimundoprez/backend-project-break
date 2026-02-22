function getLoginForm(errorMessage) {
    const html = `
        <h1>Login</h1>
        ${errorMessage ? `<p class="login-error">${errorMessage}</p>` : ""}

        <form class="data-form" action="${process.env.AUTH_URL}/login" method="POST">
            <label for="username">Usuario:</label>
            <input type="text" id="username" name="username" placeholder="nombre de usuario" required>

            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" placeholder="tu contraseña" required>

            <button type="submit">Enviar</button>
        </form>
    `;

    return html;
}

module.exports = getLoginForm;