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
        SQL`SELECT * FROM usuarios WHW=ERE nr_paciente = ${id}`,
        (err, results, fields) => {
            if (!results) {
                res.json(err)
            } else {
                res.json(results)
            }
        }
    )
}

const sendForm = (req, res) => {
    const { nome, idade, base64form } = req.body;
    const { id } = req.params;

    connection.query(
        SQL`INSERT
            INTO    usuarios
                    (nr_paciente, nome, idade, formbase64)
            VALUES  (${id}, ${nome}, ${idade}, ${base64form})`,
        (err, results, fields) => {
            if (!results) {
                console.log(err);
                res.json(err);
            } else {
                res.json(results);
            }
        }
    )
}

module.exports = {
    allUsers,
    uniqueUser,
    sendForm
};