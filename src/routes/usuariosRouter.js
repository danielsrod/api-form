const { Router } = require('express');
const {

    findUser,
    insertTerm,
    checkNr,
    checkNrForm,

} = require('../controllers/usuariosController');

const router = Router();

// Rota para pegar o termo em HTML já preenchido com os dados do usuario
// /?nr_atendimento=${nr_atendimento}&nr_sequencia=${sequencia}
router.get('/', findUser);

// Rota para validar se o nr_atendimento existe
router.get('/check', checkNr)

// Rota pra validar os formularios ja preenchidos pelo nr_atendimento
router.get('/checkForm', checkNrForm);

// Rota para enviar o termo preenchido atrelado ao nr_atendimento
router.post('/enviar', insertTerm);

module.exports = router;