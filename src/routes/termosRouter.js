const { Router } = require('express');
const {

    showTerms,
    filledTerms,

} = require('../controllers/termosController');

const router = Router();

// Listar termos
router.get('/', showTerms);

// Termos já preenchidos pelo usuário
router.get('/checkTerms/:nr_atendimento', filledTerms);

module.exports = router;