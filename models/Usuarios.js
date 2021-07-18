const Sequelize = require('sequelize');
const db = require('../database/config');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'No puede estar vacío el nombre'
            }
        }
    },
    apellidos: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Los apellidos no pueden estar vacíos'
            }
        }
    },
    correo: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un correo válido'
            },
            notEmpty: {
                masg: 'No puede estar vacío el correo'
            }
        },
        unique: {
            args: true,
            msg: 'Correo ya registrado'
        }

    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede estar vacío'
            }
        }
    },
    img: {
        type: Sequelize.STRING(60)
    },
    rol: {
        type: Sequelize.STRING(20),
        defaultValue: 'cliente'
    },
    activo: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.STRING,
    red_social: {
        type: Sequelize.STRING, 
        defaultValue: 'local'
    }
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync( usuario.password, bcrypt.genSaltSync(10) ); // Encriptar password
        }
    }
});

// Verificar contraseña cuando se inicie sesión
Usuarios.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = Usuarios;