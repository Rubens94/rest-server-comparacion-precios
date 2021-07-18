const { response } = require('express');
const Usuarios = require('../models/Usuarios');

const crearUsuario = async(req, res = response) => {

    // Leer los datos del body
    const usuario = req.body;

    try{
        // Crear el usuario
        await Usuarios.create(usuario);

        res.status(200).json(usuario);
    } catch (error){
        res.status(409).json(error)
    }


}

module.exports = {
    crearUsuario
}