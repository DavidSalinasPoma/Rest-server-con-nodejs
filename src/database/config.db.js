// Requerimos el paquete externo mongoose
const mongoose = require('mongoose');

// función asincrona de conexion
const bdConnection = async () => {
  try {
    //   Conexión a la base de datos de mongoDB
    // console.log('Hola');
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Base de datos online');
  } catch (error) {
    // si la base de datos esta arriba
    console.log(error);
    throw new 'Error al iniciar la base de datos'();
  }
};

// Exportamos la conexion
module.exports = {
  bdConnection,
};
