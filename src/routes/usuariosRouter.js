const { Router } = require('express');
const {allUsers, uniqueUser} = require('../controllers/usuariosController');

const router = Router();

router.get('/', allUsers);

router.get('/:id', uniqueUser);

module.exports = router;