const {

    termosPadroes,
    termosPreenchidos,

} = require('../DAO/termosDAO');

const showTerms = async (req, res) => {
    const resultado = await termosPadroes();

    if (!resultado) {
        return res.status(404).json({
            "status": "fail",
            "message": "Cliente não existe",
        });
    } else {
        return res.json(resultado);
    }
};

const filledTerms = async (req, res) => {
    const { nr_atendimento } = req.params;

    const resultado = await termosPreenchidos(nr_atendimento);

    if(!resultado) {
        return res.status(404).json({
            "status": "fail",
            "message": "nr_atendimento não existe"
        });
    } else {
        return res.json(resultado);
    }
};

module.exports = {

    showTerms,
    filledTerms,

};