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

const usuariosPost = async (req, res) => {
  // Extraendo datos del body que manda el cliente
  const body = req.body;

  // Instancia de usuario
  const usuario = new Usuario(body);

  // Grava el registro con mogoose en la base de datos
  await usuario.save();

  // Para trabajar con solo lo que se nesecita vamos a desestructarar el objeto
  const { nombre } = req.body;

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
