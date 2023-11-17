const express = require('express');
const routes = express.Router();

const paginaInicial = require('./src/controllers/homeController');
const formularioInsricao = require('./src/controllers/formController')

/* ROTAS */
routes.get('/', paginaInicial.index);
routes.get('/formulario_insricao', formularioInsricao.form);

/* Exportando os módulo */
module.exports = routes;