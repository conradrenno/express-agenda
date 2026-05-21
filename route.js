const express = require('express');
const route = express.Router();

const homeController = require('./src/controller/homeController');
const loginController = require('./src/controller/loginController');
const contatoController = require('./src/controller/contatoController');

const { loginRequired } = require('./src/middleware/middleware');

//Rotas da home
route.get('/', homeController.index);

route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//Rotas do contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = route;