const { response } = require('express');
const Productos = require('../models/Productos');

const crearProducto = async(req, res = response) => {

    // Leer los datos del body
    const productos = req.body;

    try{
        // Crear el producto
        await Productos.create(productos);

        res.status(200).json(productos);
    }catch (error) {
        res.status(409).json(error);
    }
}

const mostrarProductos = async(req, res = response) => {

    try{
        // Mostrar todos los productos activos 
        const productos = await Productos.findAll({ where: {estado: 1} });

        res.status(200).json(productos);
    }catch (error) {
        res.status(409).json(error);
    }
}

const actualizarProductos = async(req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        // Buscar producto en la BD
        const producto = await Productos.findByPk(id);

        if( !producto ) return res.json(409).json({msg: `No existe el producto con el ID: ${id}`});

        // Actualizar datos
        await producto.update(body);
        res.status(200).json(producto);
    }catch (error) {
        res.status(409).json(error);
    }
}

const eliminarProducto = async(req, res = response) => {

    const { id } = req.params;

    // Buscar producto en la BD
    const producto = await Productos.findByPk(id);

    if( !producto ) return res.json(409).json({msg: `No existe el producto con el ID: ${id}`});

    // Eliminar producto de manera lógica
    await producto.update({ estado: 0 });
    res.status(200).json(producto);
}

module.exports = {
    crearProducto,
    mostrarProductos,
    actualizarProductos,
    eliminarProducto
}