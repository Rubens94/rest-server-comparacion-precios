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

const mostrarUsuarios = async(req, res = response) => {

    try {
        // Mostrar todos los usuarios activos
        const usuarios = await Usuarios.findAll({ where: {activo : 1} });

        res.status(200).json( usuarios );

    } catch (error) {
        res.status(409).json(error);    
    }
}

const actualizarUsuario = async(req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try{

        // Buscar usuario en la BD
        const usuario = await Usuarios.findByPk(id);

        if( !usuario ) return res.status(409).json({msg: `No existe el usuario con el ID: ${id}`});

        // Actualizar datos
        await usuario.update( body );
        res.status(200).json(usuario);
    } catch (error){

        // Buscar correo dentro de la BD
        const emailExiste = await Usuarios.findAll({ where: { correo: body.correo}});

        if (emailExiste) return res.status(409).json({ msg: `Ya existe un usuario con el correo: ${body.correo}`});

        console.log(error);
        res.status(500).json({
            error,
            msg: 'Hable con el administrador - Problema al inserta registro en la BD'
        });
    }

}

const eliminarUsuario = async(req, res = response) => {

    const { id } = req.params;

    // Buscar usuario en la BD
    const usuario = await Usuarios.findByPk(id);

    if( !usuario ) return res.status(409).json({msg: `No existe el usuario con el ID: ${id}`});
    
    // Borrar lógicamente el usuario
    await usuario.update({ activo: 0});
    res.status(200).json(usuario);
}

module.exports = {
    crearUsuario,
    mostrarUsuarios,
    actualizarUsuario,
    eliminarUsuario
}