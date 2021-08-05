// Utilizar mongoose
const { Schema, model } = require('mongoose');

// Creación de el Schema
const roleSchema = Schema({
  rol: {
    type: String,
    require: [true, 'El rol es obligatorio'],
  },
});

module.exports = model('Role', roleSchema);
