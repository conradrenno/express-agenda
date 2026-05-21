const Contato = require('../model/ContatoModel');

exports.index = async (req, res) => {
    let contatos = [];

    if (req.session.user) {
        contatos = await Contato.findContatosByOwner(req.session.user._id);
    }

    res.render('index', { contatos });
};