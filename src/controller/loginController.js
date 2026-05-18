const Login = require('../model/LoginModel');

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('index'));
            return;
        }
        return res.send(login.errors);

    } catch (error) {
        console.error(error);
        return res.render('404');
    }
};