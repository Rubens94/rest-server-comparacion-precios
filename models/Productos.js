const Sequelize = require('sequelize');
const db = require('../database/config');

const Productos = db.define( 'productos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'No puede ir vacío el nombre del producto'
            }
        }
    },
    img: {
        type: Sequelize.STRING
    },
    cantidad: {
        type: Sequelize.DOUBLE(7,2),
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'La cantidad del producto es obligatorio'
            }
        }
    },
    medida: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'La medida debe ser piezas, litros o kilos y no puede ir vacío'
            }
        }
    },
    nombreTienda: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'El nombre de la tienda no puede ir vacío'
            }
        }
    },
    precio: {
        type: Sequelize.DOUBLE(7,2),
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'El precio no puede ir vacío'
            }
        }
    },
    moneda: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'La moneda debe ser Dls, pesos argentinos, pesos méxicanos u otra moneda'
            }
        }
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'La categoría es obligatoria'
            }
        }
    },
    estado: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
});

module.exports = Productos;