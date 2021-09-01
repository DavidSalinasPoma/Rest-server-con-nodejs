const dbValidators = require('./db-validators');

const generarJWT = require('./generar-jwt');

const googleVerify = require('./google-verify');

const subirArchivo = require('./subir-archivo');

// Exportar expandiendo todo el contenido
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...googleVerify,
  ...subirArchivo,
};
