const { Router } = require('express');
const router = Router();
const showTerms = require('../controllers/termosController');

// Listar os termos padrões
router.get('/', showTerms);

module.exports = router;

