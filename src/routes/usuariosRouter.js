const { Router } = require('express');
const {

    findUser,
    insertTerm,
    checkNr,
    checkNrForm,

} = require('../controllers/usuariosController');

const router = Router();

router.get('/', findUser);

router.get('/check/:nr_atendimento', checkNr)

router.get('/checkForm/:nr_atendimento', checkNrForm);

router.post('/enviar', insertTerm);

module.exports = router;