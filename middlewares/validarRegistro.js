const { response } = require('express');
const {
    body,
    validationResult
} = require('express-validator');

const validarRegistro = async(req, res = response, next) => {

    // Verificar que el password y el campo confirmar coincidan para poder crear el usuario
    const rules = [
        //body('apellidos').not().isEmpty().withMessage('Los apellidos son obligatorios'),
        //body('correo').not().isEmpty().withMessage('El correo es obligatorio'),
        //body('correo').isEmail().withMessage('El correo no es válido'),
        //body('password').not().isEmpty().withMessage('El password es obligatorio'),
        //body('password').isLength({ min: 6 }).withMessage('El password debe de tener más de 6 carácteres'),
        //body('confirmar').not().isEmpty().withMessage('La confirmación del password es obligatorio'),
        body('confirmar').equals(req.body.password).withMessage('Los Passwords no coinciden'),
    ];

    await Promise.all(rules.map( validation => validation.run(req) ));
    const errores = validationResult(req);

    // Si hay errores
    if(!errores.isEmpty()) return res.status(409).json(errores.array().map(error => error.msg));
    
    // Si la validación es correcta
    next();
}

module.exports = {
   validarRegistro
}