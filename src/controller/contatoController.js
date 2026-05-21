const Contato = require('../model/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', { contato: {} });
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body, req.session.user._id);
        await contato.register();
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => {
                res.redirect('/contato/index');
            });
            return;
        }
        req.flash('success', 'Contato registrado com sucesso.');
        req.session.save(() => {
            res.redirect(`/contato/index/${contato.contato._id}`);
        });
        return;
    } catch (error) {
        console.log(error);
        return res.render('404');
    }
};

exports.editIndex = async function (req, res) {
    if (!req.params.id) return res.render('404');
    const contato = await Contato.findByIdAndOwner(req.params.id, req.session.user._id);
    if (!contato) return res.render('404');
    res.render('contato', { contato });
};

exports.edit = async function (req, res) {
    try {
        if (!req.params.id) return res.render('404');
        const contato = new Contato(req.body, req.session.user._id);
        await contato.edit(req.params.id);
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => {
                res.redirect('/contato/index');
            });
            return;
        }
        req.flash('success', 'Contato editado com sucesso.');
        req.session.save(() => {
            res.redirect(`/contato/index/${contato.contato._id}`);
        });
        return;
    } catch (error) {
        console.log(error);
        return res.render('404');
    }
};

exports.delete = async function (req, res) {
    try {
        if (!req.params.id) return res.render('404');
        const contato = await Contato.findByIdAndOwner(req.params.id, req.session.user._id);
        if (!contato) return res.render('404');
        await Contato.delete(req.params.id);
        req.flash('success', 'Contato excluído com sucesso.');
        req.session.save(() => {
            res.redirect('/');
        });
    } catch (error) {
        console.log(error);
        return res.render('404');
    }
};
