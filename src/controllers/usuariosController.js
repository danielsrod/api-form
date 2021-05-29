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
        return res.status(400).json({
            "status": "fail",
            "err message": "falta de query params"
        });
    }

    try {
        const resultado = await dadosUsuario(nr_atendimento, nr_sequencia);
        if (resultado) {
            return res.json(resultado);
        } else {
            throw new Error('Ocorreu um erro ao tentar encontrar o usuario');
        }
    } catch (err) {
        return res.status(400).json({
            "status": "fail",
            "error message": err
        });
    };

};

// Função pra validar se o nr_atendimento existe
const checkNr = async (req, res) => {

    const { nr_atendimento } = req.query;

    if (!nr_atendimento) {
        return res.status(400).json({
            "status": "fail",
            "err message": "nr_atendimento não informado"
        });
    }

    try {
        const resultado = await validarNr(nr_atendimento);
        if (resultado) {
            return res.json(resultado);
        } else {
            throw new Error('Ocorreu um erro ao tentar validar o nr_atendimento');
        }
    } catch (err) {
        return res.status(400).json({
            "status": "fail",
            "error message": err
        });
    };

};

// Função pra validar se o formulario já foi preenchido com algum nr_atendimento
const checkNrForm = async (req, res) => {

    const { nr_atendimento } = req.query;

    if (!nr_atendimento) {
        return res.status(400).json({
            "status": "fail",
            "err message": "nr_atendimento não informado"
        });
    }

    try {
        const resultado = await validarNrForm(nr_atendimento);

        if (resultado) {
            return res.json({ resultado });
        } else {
            throw new Error('Ocorreu um erro ao tentar validar os formularios ja preenchidos');
        }
    } catch (err) {
        return res.status(400).json({
            "status": "fail",
            "error message": err
        });
    };

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
            "err message": "falta de query params"
        });
    };

    try {
        const resultado = await inserirTermoAssinado(nr_atendimento, nr_seq_termo_padrao, termo_image);
        if (resultado) {
            return res.json({
                "resultado": resultado,
                "status": "success",
                "message": "enviado com sucesso"
            });
        } else {
            throw new Error('Ocorreu um erro ao tentar inserir o termo preenchido');
        }
    } catch (err) {
        return res.status(400).json({
            "status": "fail",
            "error message": err
        });
    };

};

module.exports = {

    findUser,
    insertTerm,
    checkNr,
    checkNrForm,

};