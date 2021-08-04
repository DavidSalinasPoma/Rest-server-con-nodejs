// Para confirmar validaciones de campos que estan definidas en las rutas
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
  // Validacioón de campos
  const errors = validationResult(req);
  // preguntamos si  hay errores con el email ingresado por el cliente
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  // se llama a next() si este middleware pasa y sigue con el siguiente middleware
  // Y si ya no existe otro middleware(ose  validaciones en las rutas) se pasa al controlador
  next();
};

// Exportar modulos
module.exports = {
  validarCampos,
};
