const connection = require('../models/db');
const SQL = require('sql-template-strings');

const allUsers = (req, res) => {
    connection.query(
        SQL`SELECT * FROM usuarios`,
        (err, results, fields) => {
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
        SQL`SELECT * FROM usuarios WHERE nr_atendimento = ${id}`,
        (err, results, fields) => {
            if (!results) {
                res.json(err)
            } else {
                res.json(results)
            }
        }
    )
}

const createUser = (req, res) => {
    const { nome, idade, base64form } = req.body;

    connection.query(
        SQL`INSERT
            INTO    usuarios
                    (nome, idade, base64image)
            VALUES  (${nome}, ${idade}, ${base64form})`,
        (err, results, fields) => {
            if (!results) {
                res.json([err, fields]);
            } else {
                res.json(results);
            }
        }
    )
}

const sendOnlyForm = (req, res) => {
    const { base64form } = req.body;
    const { id } = req.params;

    connection.query(
        SQL`UPDATE usuarios SET base64image = ${base64form} WHERE nr_atendimento = ${id}`,
        (err, results, fields) => {
            if (!results) {
                res.json([err, fields]);
            } else {
                res.json(results);
            }
        }
    )
}

module.exports = {
    allUsers,
    uniqueUser,
    createUser,
    sendOnlyForm,

};