function checkLogin(req, res, next) {
    if (!req.session.initialized)
        res.redirect(process.env.AUTH_URL + "/login?" + new URLSearchParams({error: "No tienes acceso a esta página"}).toString());
    else
        next();
}

module.exports = {checkLogin};