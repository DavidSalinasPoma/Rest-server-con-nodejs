const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (
  files,
  extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'],
  carpeta = '', //
) => {
  //
  return new Promise((resolve, reject) => {
    // 2.- Obtener el nombre que viene desde el cliente
    const { archivo } = files;

    const nombreCortado = archivo.name.split('.');
    const sacarExtencion = nombreCortado[nombreCortado.length - 1];

    // 3.- Validar las extenciones que se requiere recibir del cliente
    if (!extencionesValidas.includes(sacarExtencion)) {
      return reject(
        `La extencion ${sacarExtencion} no es valida, Las extenciones permitidas son: ${extencionesValidas}`,
      );
    }

    // 4.- Poner un identificador unico a cada archivo que llega desde el cliente
    const nombreTemporal = uuidv4() + '.' + sacarExtencion;

    // 5.- Validar la extencion de un archivo
    const uploadPath = path.join(
      __dirname + './../uploads/',
      carpeta,
      nombreTemporal,
    ); // Manejar el path es importante

    // 6.- Mover los archivoc a una carpeta del proyecto
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      // Si todo sale bien
      resolve(nombreTemporal);
    });
  });
};

module.exports = {
  subirArchivo,
};
