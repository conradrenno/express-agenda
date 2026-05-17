const HomeModel = require('../model/HomeModel');

exports.paginaInicial = (req, res) => {
    res.render('index', {
        titulo: 'Este é o título da página',
        numeros: [1, 2, 3, 4, 5],
        nome: 'Conrado',
        sobrenome: 'Santos' //variaveis injetadas na view, podem ser usadas como variaveis normais dentro do index.ejs
    });
};

exports.trataPost = (req, res) => {
    console.log(req.body);
    res.send(`You sent: ${req.body.name}`);
};