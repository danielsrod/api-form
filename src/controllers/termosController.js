const {

    termosPadroes,
    termosPreenchidos,

} = require('../DAO/termosDAO');

// Função pra listar os termos
const showTerms = async (req, res) => {

    try {
        const resultado = await termosPadroes();
        if (resultado) {
            return res.json(resultado);
        } else {
            throw new Error('Ocorreu um erro ao tentar listar os termos');
        }
    } catch (err) {
        return res.status(400).json({
            "status": "fail",
            "err message": err
        });
    };

};

// Função pra saber os termos já preenchidos
const filledTerms = async (req, res) => {

    const { nr_atendimento } = req.params;

    if (!nr_atendimento) {
        return res.status(400).json({
            "status": "fail",
            "message": "nr_atendimento não informado"
        });
    };

    try {
        const resultado = await termosPreenchidos(nr_atendimento);
        if (resultado) {
            return res.json(resultado);
        } else {
            throw new Error('Ocorreu um erro ao tentar consultar os termos preenchidos')
        }
    } catch (err) {
        return res.status(400).json({
            "status": "fail",
            "err message": err
        });
    };

};

module.exports = {

    showTerms,
    filledTerms,

};