const {

    termosPadroes,
    termosPreenchidos,

} = require('../DAO/termosDAO');

// Função pra listar os termos
const showTerms = async (req, res) => {

    try {

        const resultado = await termosPadroes();

        if (!resultado) {
            return res.status(404).json({
                "status": "fail",
                "message": "Cliente não existe",
            });
        } else {
            return res.json(resultado);
        }
    } catch (err) {
        return res.status(400).json({
            "status": "fail",
            "message": "Ocorreu um erro ao tentar listar os termos",
            "error message": err
        })
    }
};

// Função pra saber os termos já preenchidos
const filledTerms = async (req, res) => {
    const { nr_atendimento } = req.params;

    try {


        const resultado = await termosPreenchidos(nr_atendimento);

        if (!resultado) {
            return res.status(404).json({
                "status": "fail",
                "message": "nr_atendimento não existe"
            });
        } else {
            return res.json(resultado);
        }
    } catch (err) {
        return res.status(400).json({
            "status": "fail",
            "message": "Ocorreu um erro ao tentar consultar os termos preenchidos",
            "error message": err
        })
    }
};

module.exports = {

    showTerms,
    filledTerms,

};