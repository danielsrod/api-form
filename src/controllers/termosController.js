const termosPadroes = require('../DAO/termosDAO');


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
}


module.exports = showTerms;