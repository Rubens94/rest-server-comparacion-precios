const express = require('express');
const cors = require('cors');
const { createServer } = require('http');

const db = require('../database/config');

// Importar modelos
require('../models/Usuarios');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer( this.app );

        this.paths = {
            inicio: '/api/inicio',
            usuarios: '/api/usuarios',
            productos: '/api/productos'
        }

        // Conectar DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    conectarDB() {
        db.sync()
            .then( () => console.log('Conectado a la DB'))
            .catch( error => console.log( error ));
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del Body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use( this.paths.inicio, require('../routes/inicio') );
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.productos, require('../routes/productos' ));
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log(`Server corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;