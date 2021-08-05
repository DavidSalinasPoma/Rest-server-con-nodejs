// Aqui todos los validadores de la aplicación

// Modelos
// Es los modelos se puede utilizar cualquier nombre
const rolModel = require('../models/rol.model');
const usuarioModel = require('../models/usuario.model');

// Validar si el rol existe en la BD
const esRolValido = async (rol = '') => {
  // validmos que exista el rol en la BD
  const existeRol = await rolModel.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la bd`);
  }
};

// Validar si el correo existe
const existeEmail = async (correo = '') => {
  const email = await usuarioModel.findOne({ correo }); // Busca en mongoDB si existe el correo
  if (email) {
    // devolvemos una respuesta al cliente
    throw new Error(`Este correo ${correo} ya esta registrado`);
  }
};

module.exports = {
  esRolValido,
  existeEmail,
};
