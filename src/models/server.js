const express = require('express');
const cors = require('cors');

class Server {
  // Metodo constructor de la clase
  constructor() {
    this.app = express();
    // Puerto del servidor
    this.port = process.env.PORT;

    // Path de las rutas
    this.usuariosPath = '/api/usuarios';

    // Middlewares
    this.middlewares();
    // Rutas de la app
    this.routes();
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
  }

  // Metodo de rutas
  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));
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
