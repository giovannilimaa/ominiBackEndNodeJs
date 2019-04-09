const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

//automatizar o socket.io para realtime
const server = require('http').Server(app);
const io = require('socket.io')(server);

//req,res realtime do frontend
//isola os usuarios para terem acesso apenas as box que fazem parte
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

//criar string de conexao com mongoose
mongoose.connect('mongodb+srv://giovannilima:awd142536@clustergivi-7zb1e.mongodb.net/test?retryWrites=true',
{
    useNewUrlParser: true
});

//criando uma rota --- midware
//REQ => REQUISICAO FEITA PARA O SERVIDOR
//RES => REPOSTA PARA O CLIENTE, RETORNA 
app.get('/teste', (req, res) => {

    //enviar resposta
    return res.send('Hello server');
});

//midware global para definir a qual io ele tera acesso
app.use((req, res, next) => {
    req.io = io;

    //next da continuidade ao processo
    return next();
});


//cadastra um modulo dentro do express
//o cors determina quem vai acessar, estando em dominios diferentes
//todo mundo pode acessar
app.use(cors());

//utilizado para entender requisicoes json
app.use(express.json());

//permite o envio de arquivos nas requisicoes
app.use(express.urlencoded({ extended: true }));

//quando chamar a rota files, ele redireciona para a pasta temp
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

//arquivo de rotas importando
app.use(require('./routes'));


//porta onde o app ira rodar
server.listen(3333);