const express = require('express');

class Server {
  // Metodo constructor de la clase
  constructor() {
    this.app = express();
    // Puerto del servidor
    this.port = process.env.PORT;
    // Middlewares
    this.middlewares();
    // Rutas de la app
    this.routes();
  }

  // Metodo middleware
  middlewares() {
    // directorio publico
    this.app.use(express.static('src/public'));
  }
  // Metodo de rutas
  routes() {
    this.app.get('/', (req, res) => {
      res.send('Hello World!');
    });
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
