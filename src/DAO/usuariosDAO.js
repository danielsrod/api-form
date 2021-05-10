const oracledb = require('oracledb');
const conn = require('./connDAO');

// Usuario filtrado pelo NR_ATENDIMENTO
async function dadosUsuario(nr_atendimento) {
    let sql = `
        SELECT pessoa_fisica.nm_abreviado, pessoa_fisica.ie_sexo, pessoa_fisica.nr_cpf 
        FROM atendimento_paciente
        INNER JOIN pessoa_fisica ON 
        atendimento_paciente.cd_pessoa_fisica = pessoa_fisica.cd_pessoa_fisica
        WHERE nr_atendimento = ${nr_atendimento}
    `
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

async function inserirImagem(nr_Atendimento) {
    let sql = `
    INSERT INTO 
    
    `
}


module.exports = {dadosUsuario};