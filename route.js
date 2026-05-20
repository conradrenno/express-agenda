const express = require('express');
const route = express.Router();

const homeController = require('./src/controller/homeController');
const loginController = require('./src/controller/loginController');

//Rotas da home
route.get('/', homeController.index);

route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

module.exports = route;