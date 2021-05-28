const {

    dadosUsuario,
    inserirTermoAssinado,
    validarNr,
    validarNrForm,

} = require('../DAO/usuariosDAO');

// Função pra pegar o termo HTML preenchido com os dados do usuário
const findUser = async (req, res) => {
    const { nr_atendimento, nr_sequencia } = req.query;

    if (!nr_atendimento || !nr_sequencia) {
        return res.status(400).send({
            "status": "fail",
            "message": "Falta de parametros",
        })
    }

    const resultado = await dadosUsuario(nr_atendimento, nr_sequencia);
    if (!resultado) {
        return res.status(404).json({
            "status": "fail",
            "message": "Cliente ou Formulário não existe",
        });
    } else {
        return res.json(resultado);
    }
};

// Função pra validar se o nr_atendimento existe
const checkNr = async (req, res) => {
    const { nr_atendimento } = req.params;

    if (!nr_atendimento) {
        return res.status(400).send({
            "status": "fail",
            "message": "NR Atendimento não informado",
        })
    }

    const resultado = await validarNr(nr_atendimento);

    if(!resultado) {
        return res.status(404).json({
            "status": "fail",
            "message": "nr_atendimento não existe"
        });
    } else {
        return res.json(resultado);
    }
};

// Função pra validar se o formulario já foi preenchido com algum nr_atendimento
const checkNrForm = async (req, res) => {
    const { nr_atendimento } = req.params;

    if (!nr_atendimento) {
        return res.status(400).send({
            "status": "fail",
            "message": "NR Atendimento não informado",
        })
    }

    const resultado = await validarNrForm(nr_atendimento);

    if(!resultado) {
        return res.status(404).json({
            "status": "fail",
            "message": "nr_atendimento ja foi utilizado"
        });
    } else {
        return res.json({resultado});
    }
};

// Função pra inserir o termo preenchido no banco
const insertTerm = async (req, res) => {
    const {

        nr_atendimento,
        nr_seq_termo_padrao,
        termo_image

    } = req.body;

    if (!nr_atendimento || !nr_seq_termo_padrao || !termo_image) {
        return res.status(400).json({
            "status": "fail",
            "message": "faltam dados"
        });
    };

    const resultado = await inserirTermoAssinado(nr_atendimento, nr_seq_termo_padrao, termo_image);

    if (!resultado) {
        return res.status(400).json({
            "status": "fail",
            "message": "Falha ao inserir dados preenchidos"
        });
    } else {
        return res.json({
            "resultado": resultado,
            "status": "success",
            "message": "enviado com sucesso"
        });
    }
};

module.exports = {

    findUser,
    insertTerm,
    checkNr,
    checkNrForm,

};