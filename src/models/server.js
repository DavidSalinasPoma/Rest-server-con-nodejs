const express = require('express');
const cors = require('cors');

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
    // Cors.- Permite protejer el servidor de una manera superficial
    this.app.use(cors());

    // directorio publico
    this.app.use(express.static('src/public'));
  }
  // Metodo de rutas
  routes() {
    this.app.get('/app', (req, res) => {
      res.json({
        message: 'get API',
      });
    });

    this.app.put('/app', (req, res) => {
      res.status(400).json({
        message: 'get API',
      });
    });

    this.app.post('/app', (req, res) => {
      res.status(201).json({
        message: 'get API',
      });
    });

    this.app.delete('/app', (req, res) => {
      res.json({
        message: 'get API',
      });
    });

    this.app.patch('/app', (req, res) => {
      res.json({
        message: 'get API',
      });
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
