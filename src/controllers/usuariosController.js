const connection = require('../models/db');

// const allUsers = (req, res) => {
//     connection.query(
//         SQL`SELECT * FROM usuarios`,
//         (err, results, fields) => {
//             if (!results) {                  TROCAR PARA QUERY DA ORACLE
//                 res.send(err)
//             } else {
//                 res.json(results)
//             }
//         }
//     )
// }

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

// const sendOnlyForm = (req, res) => {
//     const { base64form } = req.body;
//     const { id } = req.params;

//     connection.query(
//         SQL`UPDATE usuarios SET base64image = ${base64form} WHERE nr_atendimento = ${id}`,
//         (err, results, fields) => {
//             if (!results) {                      
//                 res.json([err, fields]);                 TROCAR PARA QUERY DA ORACLE
//             } else {
//                 res.json(results);
//             }
//         }
//     )
// }

module.exports = {
    // allUsers,
    uniqueUser,
    // sendOnlyForm,

};