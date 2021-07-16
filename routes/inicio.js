const { Router } = require('express');

const {
    rutaPrueba
} = require('../controllers/rutaPrueba');

const router = Router();

// Prueba de ruta en el navegador o Postman mandano un JSON
router.get('/', rutaPrueba );

module.exports = router;