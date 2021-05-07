const { Router } = require('express');
const {allUsers, uniqueUser} = require('../controllers/usuariosController');

const router = Router();

router.get('/', allUsers);

router.get('/:id', uniqueUser);

router.post('/:id', (req, res) => {
    const { id } = req.params;
    // Enviar para o bd, os dados
    // do formulario preenchido
    // No caso enviar a imagem
    // assinada pelo paciente

    // INSERT INTO usuarios (coluna onde a imagem via ficar armazenada)
    // WHERE nr_paciente = id - filtrar o usuario
    // VALUES (base64image)

    console.log(req.body);

    res.send(`Usuario com id ${id} foi cadastrado`);
})

module.exports = router;