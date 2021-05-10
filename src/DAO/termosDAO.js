const oracledb = require('oracledb');
const conn = require('./connDAO');


async function termosPadroes() {
    let sql = `
    SELECT nr_sequencia, ds_termo, titulo, html_termo
    FROM SAMEL.termos_padroes
    `;

    const db = await oracledb.getConnection();

    return await db.execute(sql)
        .then(result => {
            console.log(result.rows);
            return result.rows;
        })
        .catch(err => {
            console.log('Erro na consulta', err);
            return null;
        })
        .finally(() => db.close());
}


module.exports = termosPadroes;