const { Router } = require('express');
const { check } = require('express-validator');

const {
    crearUsuario
} = require('../controllers/usuarios');

const {
    validarRegistro
} = require('../middlewares/validarRegistro');

const router = Router();

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe de tener más de 6 carácteres').isLength({ min: 6 }),
    check('confirmar', 'La confirmación del password es obligatorio').not().isEmpty(),
    validarRegistro
],  crearUsuario);

module.exports = router;