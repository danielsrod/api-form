const { Router } = require('express');
const findUser = require('../controllers/usuariosController');

const router = Router();

// Pegar dados de um usuario
router.get('/:nr_atendimento', findUser);

// Inserir a imagem em base64 no bd da oracle
router.post('/:nr_atendimento', (req, res) => {


})

module.exports = router;