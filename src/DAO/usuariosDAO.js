const oracledb = require('oracledb');
const conn = require('./connDAO');

// Função para preencher o formulario dando replace nas macros
async function dadosUsuario(nr_atendimento, nr_sequencia) {

    oracledb.fetchAsString = [oracledb.CLOB]

    const sql = `
        select
            replace(
            replace(
            replace(
            replace(
            replace(
            replace(
            replace(
            replace(
            replace(
            replace(
            replace(
            replace(
            replace((select html_termo from SAMEL.termos_padroes where nr_sequencia = ${nr_sequencia})
                    , '@nm_paciente', tasy.obter_nome_pf(b.cd_pessoa_fisica))
                    ,'@cpf_paciente', tasy.obter_cpf_pessoa_fisica(b.cd_pessoa_fisica))
                    ,'@cd_pessoa_fisica', (select cd_pessoa_fisica from atendimento_paciente
                        where nr_atendimento = ${nr_atendimento}))
                    ,'@data_entrada_uti', (select dt_entrada from atendimento_paciente
                        where nr_atendimento = ${nr_atendimento}))
                    ,'@ie_tipo_convenio', (select ie_tipo_convenio from atendimento_paciente
                        where nr_atendimento = ${nr_atendimento}))
                    ,'@data_atual', CURRENT_DATE)
                    ,'@hora_atual', (SELECT TO_CHAR(SYSDATE, 'HH24') AS CURRENT_HOUR FROM DUAL))
                    ,'@minuto_atual', (SELECT TO_CHAR(SYSDATE, 'MI') AS CURRENT_MINUTE FROM DUAL))
                    ,'@idade_pf', tasy.obter_dados_pf(b.cd_pessoa_fisica, 'I'))
                    ,'@nr_atendimento', '${nr_atendimento}')
                    ,'\n', '')
                    ,'\t', '')
                    ,'\r', '')

        as html_form from SAMEL.termos_padroes a
        join atendimento_paciente b on 1 = 1
        where nr_atendimento = ${nr_atendimento}
        `;

    const db = await oracledb.getConnection();

    return await db.execute(sql)
        .then(result => {
            console.log('replaced');
            return result.rows;
        })
        .catch(err => {
            console.log('Erro na consulta', err);
            return null;
        })
        .finally(() => db.close());
};

// Função de consulta no banco pra validar o nr_atendimento
async function validarNr(nr_atendimento) {
    const sql = `
        select * from atendimento_paciente
        where nr_atendimento = ${nr_atendimento}
        `

    const db = await oracledb.getConnection();

    return await db.execute(sql)
        .then(result => {
            console.log('nr_atendimento exists ?');
            return result.rows;
        })
        .catch(err => {
            console.log('Erro na consulta', err);
            return null;
        })
        .finally(() => db.close());
};

// Função de consulta no banco pra validar se o formulário já foi preenchido com algum nr_atendimento
async function validarNrForm(nr_atendimento) {
    const sql = `
        select * from samel.termos_atendimentos
        where nr_atendimento = ${nr_atendimento}
        `;

    const db = await oracledb.getConnection();

    return await db.execute(sql)
        .then(result => {
            console.log('termo ja preenchido ?');
            return result.rows;
        })
        .catch(err => {
            console.log('Erro na consulta', err);
            return null;
        })
        .finally(() => db.close());
};

// Função de consulta para inserir o termo preenchido no banco
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
            console.log('insert termo preenchido');
            return {
                "status": "sucess",
                "mensagem": "Formulario enviado com sucesso",
                "linhas afetadas": result.rowsAffected,
                "outBinds": [],
                result
            };
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
    validarNr,
    validarNrForm

};