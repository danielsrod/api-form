const { Router } = require('express');
const { 
    allUsers, 
    uniqueUser, 
    sendUserData, 
    sendOnlyForm,

 } = require('../controllers/usuariosController');

const router = Router();

// Listar todos os usuarios
router.get('/', allUsers);

// Pegar dados de um usuario
router.get('/:id', uniqueUser);

router.post('/:id', sendUserData);

// Atualizar campo de formulario
router.patch('/:id', sendOnlyForm);

module.exports = router;