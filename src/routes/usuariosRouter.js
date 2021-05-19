const { Router } = require('express');
const {
    findUser,
    insertTerm,
    checkNr,
    checkNrForm,

} = require('../controllers/usuariosController');

const router = Router();

// Pegar dados de um usuario
router.get('/', findUser);

router.get('/check/:nr_atendimento', checkNr)

router.get('/checkForm/:nr_atendimento', checkNrForm);

// Inserir a imagem em base64 no bd da oracle
router.post('/enviar', insertTerm);

module.exports = router;