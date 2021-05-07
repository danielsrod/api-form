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
        SQL`SELECT * FROM usuarios WHERE nr_paciente = ${id}`,
        (err, results, fields) => {
            if (!results) {
                res.json(err)
            } else {
                res.json(results)
            }
        }
    )
}

const sendUserData = (req, res) => {
    const { nome, idade, base64form } = req.body;
    const { id } = req.params;

    connection.query(
        SQL`INSERT
            INTO    usuarios
                    (nr_paciente, nome, idade, formbase64)
            VALUES  (${id}, ${nome}, ${idade}, ${base64form})`,
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
        SQL`UPDATE usuarios SET formbase64 = ${base64form} WHERE nr_paciente = ${id}`,
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
    sendUserData,
    sendOnlyForm,

};