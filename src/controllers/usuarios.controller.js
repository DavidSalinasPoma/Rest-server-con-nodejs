// Para encriptar la contarseña
const bcryptjs = require('bcryptjs');
// Modelo

const Usuario = require('../models/usuario.model');

// Para el autoCompletado
const { request, response } = require('express');

// Controlador para obtener datos GET
const usuariosGet = async (req = request, res = response) => {
  // Obteniendo datos del QUERY PARAMS
  // const queryParams = req.query;

  // Obteneiendo el query Params del cliente y si no viene el limite sera de 5
  const { limite = 5, desde = 0 } = req.query;

  // Filtrando solo los que estan en estado = true
  const query = { estado: true };

  // Obteniendo datos del usuario de la BD, Utilizando paginación
  // const usuario = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // Contador de registros en la BD
  // const total = await Usuario.countDocuments(query);

  // Ejecutar instrucciones de forma simultanea De forma eficiente
  // Desestructuración de Arreglos
  const [total, usuario] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  // Desetructuracion de objetos
  // const { q, nombre, id = 'No existe', page = 1, limit = 0 } = req.query;

  res.json({
    message: 'get API-controlador',
    total,
    usuario,
  });
};

// Controlador para crear Usuario con POST
const usuariosPost = async (req = request, res = response) => {
  // Grabar solo lo que nosotros queremos con desestructuracion de objetos
  const { nombre, correo, password, rol } = req.body;

  // Instancia de usuario
  const usuario = new Usuario({ nombre, correo, password, rol });

  // 2.- Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10); // 10 es las vueltas de encriptacion
  usuario.password = bcryptjs.hashSync(password, salt); // hash es para encriptar en una sola via.

  // 3.- Guardar en la base de datos con registro con mogoose.
  await usuario.save();

  // Respuesta al cliente desde el servidor
  res.status(201).json({
    message: 'post API-controlador',
    usuario,
  });
};

// Controllador para actualizar usuario con PUT
const usuariosPut = async (req = request, res = response) => {
  // Recibe datos de los parametros URL del cliente
  const { id } = req.params;

  // Desestructurar la informacion que viene desde el cliente
  // Extraer todo lo que no se necesita que se grabe en la BD
  const { _id, password, google, correo, ...restoUsuario } = req.body;

  // Todo: Validar contra la base de datos
  // si el,pass existe sisgnifica que quiere actualizar su contraseña
  if (password) {
    // Encriptar la contraseña y la reestablese en restoUsuario
    const salt = bcryptjs.genSaltSync(10); // 10 es las vueltas de encriptacion
    restoUsuario.password = bcryptjs.hashSync(password, salt); // hash es para encriptar en una sola via.
  }

  // Actualizando en la DB por el id y el restoUsuario
  const usuario = await Usuario.findByIdAndUpdate(id, restoUsuario);

  res.status(400).json({
    message: 'put API-controlldor',
    id: id,
    usuario, // Retorna el usuario actualizado
  });
};

// Controlador para eliminar o dar de baja a Usuario con DELETE
const usuariosDelete = async (req, res) => {
  // Recibe datos de los parametros URL del cliente
  const { id } = req.params;

  // Borrar fisicamente de mongoDB
  // const usuario = await Usuario.findByIdAndDelete(id);

  // Dando de baja al usuario Cambiando su estado a false
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    message: 'delete API-controllador',
    id,
    usuario,
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    message: 'path API-controllador',
  });
};

// Exportando los controladores
module.exports = {
  // Son referencias
  usuariosPost,
  usuariosGet,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};
