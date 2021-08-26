// Paquete JWT
const jwt = require('jsonwebtoken');
// Modelos
const Usuario = require('../models/usuario.model');
// Para el autocompletado
const { response, request } = require('express');

// next() continua con el siguiente middleware o controlador
const validarJWT = async (req = request, res = response, next) => {
  // Leer datos de los header o cabeceras
  // Este dato viene del cliente en el header x-token
  let token = req.header('x-token');

  // Validar si el cliente mando el token
  if (!token) {
    return res.status(400).json({
      message: 'El usuario no mando el token',
    });
  }

  try {
    // token..- que el cliente envia
    // llave secreta del backend
    // Extraer el uid del jwt(payload)
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Leer el usuario que corresponde el uid
    const usuario = await Usuario.findById(uid);

    //   Validar si el usuario existe en la bd
    if (!usuario) {
      return res.status(401).json({
        message: 'Token no valido - Usuario no existe en BD',
      });
    }

    // Validacion verificar si el uid tiene un estado:true
    // Un usuario que ha sido eliminado ya no tiene que estar
    if (!usuario.estado) {
      return res.status(401).json({
        message: 'Token no valido - Usuario con estado:false',
      });
    }

    // Pasamos por referencia
    req.usuario = usuario;

    // next() continua con el siguiente middleware o controlador
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Token no valido',
    });
  }
};

module.exports = {
  validarJWT,
};
