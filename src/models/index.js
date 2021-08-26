// Las constantes estan en mayusculas porque Los modelos estan Exportados con mayusculas
const Categoria = require('./categoria.model');
const Role = require('./rol.model');
const Server = require('./server');
const Usuario = require('./usuario.model');
const Producto = require('./producto.model');

module.exports = {
  Categoria,
  Role,
  Server,
  Usuario,
  Producto,
};
