const connection = require('../models/db');

const allUsers = (req, res) => {
    connection.query(
        'SELECT * FROM `usuarios`',
        function(err, results, fields) {
            if(!results) {
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
        function(err, results, fields) {
            if(!results) {
                res.send(err)
            } else {
                res.json(results)
            }
        }
    )
}

module.exports = {
    allUsers,
    uniqueUser,
};