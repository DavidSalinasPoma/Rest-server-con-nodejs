// Aqui todos los validadores de la aplicación

// Modelos
// Es los modelos se puede utilizar cualquier nombre
const { Categoria, Producto } = require('../models');
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

/**
 * Validar categoria por id
 */
const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id); // Busca en mongoDB si existe el ID
  if (!existeCategoria) {
    // devolvemos una respuesta al cliente
    throw new Error(`El Id no existe ${id}`);
  }
};

/**
 *  Validar producto por ID
 */
const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id); // Busca en mongoDB si existe el ID
  if (!existeProducto) {
    // devolvemos una respuesta al cliente
    throw new Error(`El Id no existe ${id}`);
  }
};

/**
 * Validar las colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
  const incluidas = colecciones.includes(coleccion);
  if (!incluidas) {
    throw new Error(
      `La colección ${coleccion} no es permitida, ${colecciones}`,
    );
  }
  // si todo sale bien
  return true;
};

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
  coleccionesPermitidas,
};
