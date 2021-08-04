// Para encriptar la contarseña
const bcryptjs = require('bcryptjs');
// Para confirmar validaciones de campos que estan definidas en las rutas
const { validationResult } = require('express-validator');

// Para el autoCompletado
const { request, response } = require('express');
// Modelos
const Usuario = require('../models/usuario.model');

const usuariosGet = (req = request, res = response) => {
  // Obteniendo datos del QUERY PARAMS
  const queryParams = req.query;

  // Desetructuracion de objetos
  const { q, nombre, id = 'No existe', page = 1, limit } = req.query;

  res.json({
    message: 'get API-controlador',
    queryParams,
    q,
    nombre,
    id,
    page,
    limit,
  });
};

const usuariosPost = async (req = request, res = response) => {
  // Validacioón de campos
  const errors = validationResult(req);
  // preguntamos si  hay errores con el email ingresado por el cliente
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  // Grabar solo lo que nosotros queremos con desestructuracion de objetos
  const { nombre, correo, password, rol } = req.body;

  // Instancia de usuario
  const usuario = new Usuario({ nombre, correo, password, rol });

  // 1.- Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo }); // Busca en mongoDB si existe el correo
  if (existeEmail) {
    // devolvemos una respuesta al cliente
    return res.status(400).json({
      message: 'Este correo ya esta en usó.',
    });
  }

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

const usuariosPut = (req = request, res = response) => {
  // Recibe datos de los parametros URL del cliente
  const { id } = req.params;

  // Extraendo datos del body que manda el cliente
  const body = req.body;

  res.status(400).json({
    message: 'put API-controlldor',
    id: id,
    body,
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    message: 'delete API-controllador',
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
