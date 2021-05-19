'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const usuariosRouter = require('./routes/usuariosRouter');
const termosRouter = require('./routes/termosRouter');

app.use(cors());
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res) => {
    console.log('home');
    res.json({ message: "home" });
})

app.use('/api/usuarios', usuariosRouter);
app.use('/api/termos', termosRouter);

app.all('/*', (req, res) => {
    res.sendStatus(404);
})

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.info(`App rodando em http://${HOST}:${PORT}`);
});