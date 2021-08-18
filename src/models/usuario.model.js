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
    default: 'USER_ROLE',
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

// Quitar el password y la version para que no muestre al cliente
// Funcion normal para utilizar el THIS
usuarioSchema.methods.toJSON = function () {
  // 1.-__V estamos.- quitando la version
  // 2.- password.- estamos quitando la contraseña
  // 3.- ...usuario.- estamos unificando el nuevo objeto sin la version y el password
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id; // Transformar el _id por uid
  return usuario;
};

// Exportamos el nombre de la tabla con el esquema construido
module.exports = model('Usuarios', usuarioSchema);
