const { Router } = require('express');
const { 
    allUsers, 
    uniqueUser, 
    sendUserData, 
    sendOnlyForm,
    
 } = require('../controllers/usuariosController');

const router = Router();

router.get('/', allUsers);

router.get('/:id', uniqueUser);

router.post('/:id', sendUserData);

router.patch('/:id', sendOnlyForm);

module.exports = router;