const { Router } = require('express');
const { check } = require('express-validator');

const {
    crearProducto,
    mostrarProductos,
    actualizarProductos,
    eliminarProducto
} = require('../controllers/productos');

const router = Router();

// Crear producto
router.post('/', [
    check('nombre', 'El nombre no puede estar vacío').not().isEmpty().escape().trim(),
    check('cantidad', 'La cantidad no puede estar vacía').not().isEmpty().escape().trim(),
    check('medida', 'La medida debe ser piezas, litros o kilos y no puede ir vacío').not().isEmpty().escape().trim(),
    check('nombreTienda', 'El nombre de la tienda no puede ir vacío').not().isEmpty().escape().trim(),
    check('precio', 'El precio no puede ir vacío').not().isEmpty().escape().trim(),
    check('moneda', 'La moneda debe ser Dls, pesos argentinos, pesos méxicanos u otra moneda').not().isEmpty().escape().trim(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty().escape().trim(),
], crearProducto );

// Mostrar productos
router.get('/', mostrarProductos );

// Actualizar productos
router.put('/:id', [
    check('nombre', 'El nombre no puede estar vacío').not().isEmpty().escape().trim(),
    check('cantidad', 'La cantidad no puede estar vacía').not().isEmpty().escape().trim(),
    check('medida', 'La medida debe ser piezas, litros o kilos y no puede ir vacío').not().isEmpty().escape().trim(),
    check('nombreTienda', 'El nombre de la tienda no puede ir vacío').not().isEmpty().escape().trim(),
    check('precio', 'El precio no puede ir vacío').not().isEmpty().escape().trim(),
    check('moneda', 'La moneda debe ser Dls, pesos argentinos, pesos méxicanos u otra moneda').not().isEmpty().escape().trim(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty().escape().trim(),
], actualizarProductos );

// Eliminar producto
router.delete('/:id', eliminarProducto );

module.exports = router;