const {
    dadosUsuario,
    inserirTermoAssinado
} = require('../DAO/usuariosDAO');


const findUser = async (req, res) => {
    const { nr_atendimento, nr_sequencia } = req.query;

    const resultado = await dadosUsuario(nr_atendimento);
    if (!resultado) {
        return res.status(404).json({
            "status": "fail",
            "message": "Cliente não existe",
        });
    } else if (!resultado) {
        return res.status(404).json({
            "status": "fail",
            "message": "formulario não existe"
        })
    } else {
        return res.json(resultado);
    }
}

const insertTerm = async (req, res) => {
    const {
        nr_atendimento,
        nr_seq_termo_padrao,
        termo_image
    } = req.query;

    if (!nr_atendimento || !nr_seq_termo_padrao || !termo_image) {
        return res.status(400).json({
            "status": "fail",
            "message": "faltam dados"
        })
    }

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
        })
    }

}


module.exports = {
    findUser,
    insertTerm,

};