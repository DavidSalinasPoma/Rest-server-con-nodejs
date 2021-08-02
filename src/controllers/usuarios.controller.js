// Para el autoCompletado
const { response } = require('express');

const usuariosGet = (req, res = response) => {
  res.json({
    message: 'get API-controlador',
  });
};

const usuariosPost = (req, res) => {
  // Extraendo datos del body que manda el cliente
  const body = req.body;

  // Para trabajar con solo lo que se nesecita vamos a desestructarar el objeto
  const { nombre } = req.body;

  res.status(201).json({
    message: 'post API-controlador',
    body: body,
    name: nombre,
  });
};

const usuariosPut = (req, res) => {
  res.status(400).json({
    message: 'put API-controlldor',
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
