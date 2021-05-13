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
    replace(
    replace(
    replace(
    replace(html_termo, '@nm_paciente', tasy.obter_nome_pf(b.cd_pessoa_fisica))
            ,'@cpf_paciente', tasy.obter_cpf_pessoa_fisica(b.cd_pessoa_fisica))
            ,'@an_paciente', (select dt_nascimento from atendimento_paciente join pessoa_fisica
                    on atendimento_paciente.cd_pessoa_fisica = pessoa_fisica.cd_pessoa_fisica
                    where nr_atendimento = ${nr_atendimento}))
            ,'@data_atual', CURRENT_DATE)
            ,'\n', '')
            ,'\r', '')
            ,'\t', '')
            
                    
                    
as html_ser_montado from SAMEL.termos_padroes a
join atendimento_paciente b on 1 = 1
where nr_atendimento = ${nr_atendimento}
    `; // Nao colocar > ; < no final da query

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