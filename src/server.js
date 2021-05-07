const express = require('express');
const app = express();
const cors = require('cors');
const usuariosRouter = require('./routes/usuariosRouter');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({message: "home"});
})

app.use('/api/usuarios', usuariosRouter);

app.all('/*', (req, res) => {
    res.sendStatus(404);
})


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.info(`rodando na porta: ${PORT}`);
});