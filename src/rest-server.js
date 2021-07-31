const express = require('express');
require('dotenv').config();

// Utilizar express
const app = express();
// Puerto de restserver
const port = process.env.PORT;

// Configuracion de la carpeta publica como estatica

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Hace que corra el servidor
app.listen(port, () => {
  console.log(`Corriendo en  http://localhost:${port}`);
});
