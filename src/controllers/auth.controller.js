// Paquete bcryptjs para encriptar la contraseña
const bcryptjs = require('bcryptjs');

// Para el tipado
const { response, request } = require('express');

// Modulo generar token
const { generarJWT } = require('../helpers/generar-jwt');

// Modelo
const Usuario = require('../models/usuario.model'); // El nombre del modelo puede ser cuaquier nombre

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    // 1.- Verifiar si el email o usuario existe
    const usuario = await Usuario.findOne({ correo }); // si esto regresa algo significa que el usuario exite
    if (!usuario) {
      return res.status(400).json({
        message: 'Usuario / Password no son correctos - correo',
      });
    }
    // 2.- Si el usuario esta activo
    if (usuario.estado === false) {
      return res.status(400).json({
        message: 'Usuario / Password no son correctos - Estado: false',
      });
    }
    // 3.- Verificar la contraseña
    // compara el pass q viene del cliente y el pass de la base de datos

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (validPassword === false) {
      return res.status(400).json({
        message: 'Usuario / Password no son correctos - Password: Incorrecto',
      });
    }
    // 4.- generar el JWT
    console.log(usuario.id);
    const token = await generarJWT(usuario.id);

    res.json({
      message: 'Login ok',
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    // Es un internal server error
    return res.status(500).json({
      message: 'Algo salio mal, hable con el administrador',
    });
  }
};

module.exports = {
  login,
};
