const { Router } = require('express');
const {allUsers, uniqueUser, sendForm} = require('../controllers/usuariosController');

const router = Router();

router.get('/', allUsers);

router.get('/:id', uniqueUser);

router.post('/:id', sendForm)

module.exports = router;