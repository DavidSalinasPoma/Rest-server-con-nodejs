const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
  nombre: {
    type: String,
    require: [true, 'El nombre es obligatorio'],
  },
  correo: {
    type: String,
    require: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'La contraseña es obligatorio'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    require: [true, 'El rol es obligatorio'],
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
