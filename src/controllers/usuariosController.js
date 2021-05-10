const {dadosUsuario} = require('../DAO/usuariosDAO');


const findUser = async (req, res) => {
    const { nr_atendimento } = req.params;

    const resultado = await dadosUsuario(nr_atendimento);
    if (!resultado) {
        return res.status(404).json({
            "status": "fail",
            "message": "Cliente não existe",
        });
    } else {
        return res.json(resultado);
    }
}


module.exports = { findUser };