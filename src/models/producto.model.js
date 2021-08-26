// Utilizar mongoose
const { Schema, model } = require('mongoose');

// Creación de el Schema
const productoSchema = Schema({
  nombre: {
    type: String,
    require: [true, 'El nombre del Producto es obligatorio es obligatorio'],
    unique: true, // Campo unico
  },
  estado: {
    type: Boolean,
    default: true, // Se graba por defecto en true
    required: true, // que es obligatorio
  },
  // Se decea saber que usuario lo creo
  usuario: {
    type: Schema.Types.ObjectId, // Otro objeto que se va a tener en mongo
    ref: 'Usuarios', // La referencia del export del schema usuario
    required: true, // Es obligatorio
  },
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
});

// Funcion normal para utilizar el THIS
productoSchema.methods.toJSON = function () {
  // 1.-__V estamos.- quitando la version
  //2.- quitar estado
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model('Producto', productoSchema);
