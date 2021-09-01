const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Modulos propios
const { bdConnection } = require('./../database/config.db');

class Server {
  // Metodo constructor de la clase
  constructor() {
    this.app = express();
    // Puerto del servidor
    this.port = process.env.PORT;

    // Path para las rutas
    this.path = {
      auth: '/api/auth', // Path para el login con jwt
      buscar: '/api/buscar', // Path para hacer las busquedas
      categorias: '/api/categorias', // Path para las categorias
      productos: '/api/productos', // Path para los productos
      usuarios: '/api/usuarios', // Path para los usuarios
      uploads: '/api/uploads', // Path para cargar archivos
    };

    // Path de las rutas

    this.authPath =
      // Conectar a la Base de datos mongoDB
      this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de la app
    this.routes();
  }

  // Metooo que conecta la bd a mongoDB
  async conectarDB() {
    await bdConnection(); // Solo se hace referencia a la función
  }

  // Metodo middleware
  middlewares() {
    // Cors.- Permite protejer el servidor de una manera superficial
    this.app.use(cors());

    // Lectura y parseo del body
    // Des esta manera cualquier informacion que venga ya sea de post, put o delete
    // la va a intentar serializar a um formato json
    // porque trabajar con json muy facil con javascript
    this.app.use(express.json());

    // directorio publico
    this.app.use(express.static('src/public'));

    // Fileupload-Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      }),
    );
  }

  // Metodo de rutas
  routes() {
    // Ruta para login
    this.app.use(this.path.auth, require('../routes/auth.routes'));
    // Ruta para Usuarios
    this.app.use(this.path.usuarios, require('../routes/usuarios.routes'));
    // Ruta para las categorias
    this.app.use(this.path.categorias, require('../routes/categorias.routes'));
    // Ruta para los productos
    this.app.use(this.path.productos, require('../routes/productos.routes'));
    // Ruta para  buscar
    this.app.use(this.path.buscar, require('../routes/buscar.routes'));
    // Ruta para cargar Archivos
    this.app.use(this.path.uploads, require('../routes/uploads.routes'));
  }

  // Metodo que escucha el puerto
  listesPort() {
    this.app.listen(this.port, () => {
      console.log(`Corriendo en  http://localhost:${this.port}`);
    });
  }
}

module.exports = {
  Server,
};
