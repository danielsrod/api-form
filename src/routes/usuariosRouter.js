const { Router } = require('express');
const {
    findUser,
    insertTerm,
    checkNr
} = require('../controllers/usuariosController');

const router = Router();

// Pegar dados de um usuario
router.get('/', findUser);

router.get('/check/:nr_atendimento', checkNr)

// Inserir a imagem em base64 no bd da oracle
router.post('/', insertTerm);

module.exports = router;