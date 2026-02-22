const baseHtml = require("../helpers/baseHtml.js");
const getLoginForm = require("../helpers/getLoginForm.js");
const getNavBar = require("../helpers/getNavBar.js");

function showLogin(req, res) {
    res.send(baseHtml("Login", getNavBar(false), getLoginForm(req.query.error)));
}

function loginUser(req, res) {
    const username = req.body?.username;
    const password = req.body?.password;

    if ((!username || username !== process.env.AUTH_USERNAME) ||
    (!password || password !== process.env.AUTH_PASSWORD))
    {
        res.redirect(process.env.AUTH_URL + "/login?" + new URLSearchParams({error: "Usuario o contraseña incorrectos"}).toString());
    }
    else {
        req.session.regenerate((err) => {
            if (err) {
                res.redirect(process.env.AUTH_URL + "/login?" + new URLSearchParams({error: "Error al crear la sesión de admin"}).toString());
            }
            else {
                req.session.initialized = true;
                res.redirect(process.env.DASHBOARD_URL);
            }
        });
    }
}

function logoutUser(req, res) {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.redirect(process.env.PRODUCTS_URL);
    });
}

module.exports = {showLogin, loginUser, logoutUser};