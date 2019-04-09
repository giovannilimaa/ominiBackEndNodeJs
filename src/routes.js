//importando o express
const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

//criar variavel de rotas
const routes = express.Router();

//importar a boxcontroller
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

//DENTRO DA ARQ. API REST TEMOS 4 METODOS
//GET / POST / PUT / DELETE
//passando o metodo post e chamadno metodo store da controller
routes.post('/boxes',BoxController.store);
//mostrar arquivo que foi salvo
routes.get('/boxes/:id',BoxController.show);

//chamar o metodo para adicionar o arquivo
routes.post(
    '/boxes/:id/files',
    multer(multerConfig).single('file'), 
    FileController.store
);

//exportando
module.exports = routes;