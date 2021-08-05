// Aqui todos los validadores de la aplicación

// Modelos
// Es los modelos se puede utilizar cualquier nombre
const Rol = require('../models/rol.model');
const Usuario = require('../models/usuario.model');

// Validar si el rol existe en la BD
const esRolValido = async (rol = '') => {
  // validmos que exista el rol en la BD
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la bd`);
  }
};

// Validar si el correo existe
const existeEmail = async (correo = '') => {
  const email = await Usuario.findOne({ correo }); // Busca en mongoDB si existe el correo
  if (email) {
    // devolvemos una respuesta al cliente
    throw new Error(`Este correo ${correo} ya esta registrado`);
  }
};

// Validar si el ID existe
const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id); // Busca en mongoDB si existe el ID
  if (!existeUsuario) {
    // devolvemos una respuesta al cliente
    throw new Error(`El Id no existe ${id}`);
  }
};

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
};
