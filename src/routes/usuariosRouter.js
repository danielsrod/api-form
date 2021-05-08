const { Router } = require('express');
const { 
    allUsers, 
    uniqueUser, 
    sendOnlyForm,

 } = require('../controllers/usuariosController');

const router = Router();

// Listar todos os usuarios
router.get('/', allUsers);

// Pegar dados de um usuario
router.get('/:id', uniqueUser);

// Atualizar campo de formulario
router.patch('/:id', sendOnlyForm);

module.exports = router;