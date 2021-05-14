const { Router } = require('express');
const {
    findUser,
    insertTerm,
} = require('../controllers/usuariosController');

const router = Router();

// Pegar dados de um usuario
router.get('/', findUser);

// Inserir a imagem em base64 no bd da oracle
router.post('/', insertTerm);

module.exports = router;