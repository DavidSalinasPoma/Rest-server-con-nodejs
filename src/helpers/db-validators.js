// Aqui todos los validadores de la aplicación

// Importamos el modelo ROL
const rolModel = require('../models/rol.model');

// Validar si el rol existe en la BD
const esRolValido = async (rol = '') => {
  // validmos que exista el rol en la BD
  const existeRol = await rolModel.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la bd`);
  }
};

module.exports = {
  esRolValido,
};
