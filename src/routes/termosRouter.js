const { Router } = require('express');
const {
    showTerms,
    filledTerms,

} = require('../controllers/termosController');
const router = Router();

// Listar os termos padrões
router.get('/', showTerms);

router.get('/checkTerms', filledTerms);

module.exports = router;
