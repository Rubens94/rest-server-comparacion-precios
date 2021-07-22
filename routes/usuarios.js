const { Router } = require('express');
const { check } = require('express-validator');

const {
    crearUsuario,
    mostrarUsuarios,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/usuarios');

const {
    validarRegistro
} = require('../middlewares/validarRegistro');

const router = Router();

// Crear usuario
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty().escape().trim(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty().escape().trim(),
    check('correo', 'El correo es obligatorio').not().isEmpty().escape().trim(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty().escape().trim(),
    check('password', 'El password debe de tener más de 6 carácteres').isLength({ min: 6 }),
    check('confirmar', 'La confirmación del password es obligatorio').not().isEmpty().escape().trim(),
    validarRegistro
],  crearUsuario);

// Mostrar usuarios
router.get('/', mostrarUsuarios);

// Actualizar usuario por id
router.put('/:id', actualizarUsuario);

// Eliminar usuario por ID
router.delete('/:id', eliminarUsuario);

module.exports = router;