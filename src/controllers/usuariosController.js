const connection = require('../models/db');

const allUsers = (req, res) => {
    connection.query(
        'SELECT * FROM `usuarios`',
        function (err, results, fields) {
            if (!results) {
                res.send(err)
            } else {
                res.json(results)
            }
        }
    )
}

const uniqueUser = (req, res) => {
    const { id } = req.params;
    connection.query(
        "SELECT * FROM usuarios WHERE nr_paciente = '" + id + "'",
        function (err, results, fields) {
            if (!results) {
                res.send(err)
            } else {
                res.json(results)
            }
        }
    )
}

const sendForm = (req, res) => {
    const { id } = req.params;



    /*
     enviar para o bd a imagem
     do forumario preenchido em
     base64, inserindo no campo
     correspondente ao usuario
     */

    console.log(req.body);

    res.send(`formulario enviado para o banco de dados. id do usuario ${id}`);
}


module.exports = {
    allUsers,
    uniqueUser,
    sendForm
};