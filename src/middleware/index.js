// middleware personalizado para hacer validaciones
const validarCampos = require('../middleware/validar-campos.middleware');
const validarJWT = require('../middleware/validar-jwt.middleware');
const validarRoles = require('../middleware/validar-roles.middleware');
const validarArchivo = require('../middleware/validar-subirArchivo.middleware');

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validarRoles,
  ...validarArchivo,
};
