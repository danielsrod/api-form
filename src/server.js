'use strict';

const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const usuariosRouter = require('./routes/usuariosRouter');
const termosRouter = require('./routes/termosRouter');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res) => {
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