const oracledb = require('oracledb');
const conn = require('./connDAO');

// Usuario filtrado pelo NR_ATENDIMENTO
async function dadosUsuario(nr_atendimento) {

    oracledb.fetchAsString = [oracledb.CLOB]
    const sql = `
    select
        replace(
            replace(
                replace(
                html_termo, '@nm_paciente', tasy.obter_nome_pf(b.cd_pessoa_fisica)),
                '@sx_paciente', 'FEM'),
                '@an_paciente', '1999')
                as html_ser_montado from SAMEL.termos_padroes a
                join atendimento_paciente b on 1 = 1
                where nr_atendimento = ${nr_atendimento}
    `
    // const sql = `
    //     SELECT pessoa_fisica.nm_abreviado, pessoa_fisica.ie_sexo, pessoa_fisica.nr_cpf,
    //     FROM atendimento_paciente
    //     INNER JOIN pessoa_fisica ON 
    //     atendimento_paciente.cd_pessoa_fisica = pessoa_fisica.cd_pessoa_fisica
    //     WHERE nr_atendimento = ${nr_atendimento}
    // `

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

// Inserir formulario preenchido atrelado ao nr_atendimento
async function inserirTermoAssinado(nr_atendimento, nr_seq_termo_padrao, termo_image) {
    const sql = `
    INSERT INTO SAMEL.termos_atendimentos
    (NR_ATENDIMENTO, NR_SEQ_TERMO_PADRAO, TERMO_IMAGE)
    VALUES(:nr_atendimento, :nr_seq_termo_padrao, :termo_image)
    `;  

    const db = await oracledb.getConnection();

    return await db.execute(sql,
        {
            ":nr_atendimento": { "dir": oracledb.BIND_IN, "type": oracledb.NUMBER, "val": parseInt(nr_atendimento) },
            ":nr_seq_termo_padrao": { "dir": oracledb.BIND_IN, "type": oracledb.NUMBER, "val": parseInt(nr_seq_termo_padrao) },
            ":termo_image": { "dir": oracledb.BIND_IN, "type": oracledb.CLOB, "val": termo_image },
        },
        {
            autoCommit: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
    )
        .then(result => {
            console.log(result)
            return result;
        })
        .catch(err => {
            console.log('Erro ao inserir', err);
            return null;
        })
        .finally(() => db.close());
};


module.exports = {
    dadosUsuario,
    inserirTermoAssinado,

};