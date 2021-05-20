const oracledb = require('oracledb');
const conn = require('./connDAO');

async function termosPadroes() {
    oracledb.fetchAsString = [oracledb.CLOB]

    let sql =
    `
    SELECT nr_sequencia, ds_termo, titulo, html_termo
    FROM SAMEL.termos_padroes
    `;

    const db = await oracledb.getConnection();

    return await db.execute(sql)
        .then(result => {
            console.log('termos_padroes');
            return result.rows;
        })
        .catch(err => {
            console.log('Erro na consulta', err);
            return null;
        })
        .finally(() => db.close());
}

async function termosPreenchidos(nr_atendimento) {
    let sql = `
    select nr_seq_termo_padrao from samel.termos_atendimentos
    where nr_atendimento = ${nr_atendimento}
    `;

    const db = await oracledb.getConnection();

    return await db.execute(sql)
        .then(result => {
            console.log('id dos termos');
            return result.rows;
        })
        .catch(err => {
            console.log('Erro na consulta', err);
            return null;
        })
        .finally(() => db.close());
}

module.exports = {

    termosPadroes,
    termosPreenchidos,

};