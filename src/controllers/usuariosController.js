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

const uniqueUser = async (req, res) => {
    const { id } = req.params;

    const result = await connection.execute(
        `
        SELECT pessoa_fisica.nm_pessoa_fisica, pessoa_fisica.ie_sexo, pessoa_fisica.nr_cpf 
        FROM atendimento_paciente
        INNER JOIN pessoa_fisica ON 
        atendimento_paciente.cd_pessoa_fisica = pessoa_fisica.cd_pessoa_fisica
        WHERE nr_atendimento = :id;
        `, [id],
    );

    res.json(result)

    connection.close();
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