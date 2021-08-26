// Utilizar mongoose
const { Schema, model } = require('mongoose');

// Creación de el Schema
const categoriaSchema = Schema({
  nombre: {
    type: String,
    require: [true, 'El nombre es obligatorio es obligatorio'],
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
});

// Funcion normal para utilizar el THIS
categoriaSchema.methods.toJSON = function () {
  // 1.-__V estamos.- quitando la version
  //2.- quitar estado
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model('Categoria', categoriaSchema);
