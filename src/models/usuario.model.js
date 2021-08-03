const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatorio'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio'],
    emun: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true, // cuando se cree un usuario va a estar activado
  },
  google: {
    type: Boolean,
    default: false, // Cuando se ha creado por google estar en true
  },
});

// Exportamos el nombre de la tabla con el esquema construido
module.exports = model('Usuarios', usuarioSchema);
