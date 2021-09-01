// Para guardar imagenes en un servidor externo
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const path = require('path');
const fs = require('fs');
// Para el auto completado
const { response, request } = require('express');
const { subirArchivo } = require('../helpers');

// Modelos
const { Usuario, Producto } = require('../models');

// CONTROLLADOR PARA CARGAR ARCHIVOS
const cargarArchivo = async (req = request, res = response) => {
  // Resuelve solo el nombre del arhivo
  // Mandar archivos txt
  try {
    // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos'); // Funciona
    const nombre = await subirArchivo(req.files, undefined, 'imgs'); // Funciona
    res.json({
      nombre,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

// CONTROLLADOR PARA ACTUALIZAR IMAGENES
const actualizarImagen = async (req = request, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          // bad request
          message: `No existe el usuario con el ${id}`,
        });
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          message: `No existe un producto con el ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        message: 'Se me olvido validar esto',
      });
  }

  // Limpiar imagenes previas o antiguas
  if (modelo.img) {
    // hay que boorrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      './../uploads',
      coleccion,
      modelo.img,
    );
    // Si exite borra el archivo
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  // Actualizacion en la BD
  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre; // Es el nombre del archivo

  // Guardando en mongo DB
  await modelo.save();

  // Respuesta al cliente
  res.json({
    modelo,
  });
};

// CONTROLLADOR PARA MOSTRAR IMAGENES
const mostrarImagen = async (req = request, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        // si el modelo no existe??
        return res.status(400).json({
          // bad request
          message: `No existe el usuario con el ${id}`,
        });
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          message: `No existe un producto con el ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        message: 'Se me olvido validar esto',
      });
  }

  // Limpiar imagenes previas o antiguas
  if (modelo.img) {
    // hay que boorrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      './../uploads',
      coleccion,
      modelo.img,
    );
    // Si exite borra el archivo
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  // Respuesta al cliente
  const pathImagen = path.join(__dirname, './../assets/no-image.jpg');
  res.sendFile(pathImagen);
};

// CONTROLLADOR PARA ACTUALIZAR IMAGENES CON CLOUDINARY
const actualizarImagenCloudinary = async (req = request, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          // bad request
          message: `No existe el usuario con el ${id}`,
        });
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          message: `No existe un producto con el ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        message: 'Se me olvido validar esto',
      });
  }

  // Limpiar imagenes previas o antiguas
  if (modelo.img) {
    // hay que boorrar la imagen del servidor
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.');

    cloudinary.uploader.destroy(public_id);
  }

  // Subir la imagen a cloudimary
  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;
  await modelo.save();
  // Respuesta al cliente
  res.json({
    modelo,
  });
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
};
