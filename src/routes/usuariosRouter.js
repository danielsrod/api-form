const { Router } = require('express');
const findUser = require('../controllers/usuariosController');

const router = Router();

// Pegar dados de um usuario
router.get('/:nr_atendimento', findUser);

module.exports = router;