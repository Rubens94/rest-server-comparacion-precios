const { response } = require('express');

const rutaPrueba = (req, res = response) => {

    res.status(200).json({
        mensaje: 'Prueba exitosa'
    });
}

module.exports = {
    rutaPrueba
}