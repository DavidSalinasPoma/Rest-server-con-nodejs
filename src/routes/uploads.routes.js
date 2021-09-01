// Paquete  interno de express
const { Router } = require('express');
// Paquete para realizar validaciones de campos
const { check } = require('express-validator');

// Activa los middlewares o check
const { validarArchivo, validarCampos } = require('../middleware');

// Controladores
const {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
} = require('../controllers/uploads.controller');

// Helpers
const { coleccionesPermitidas } = require('../helpers');

// Utilizamos el Router
const router = Router();

// Subir aarchivo con POST
router.post('/', validarArchivo, cargarArchivo);

// Cargar archivos
router.put(
  '/:coleccion/:id',
  [
    validarArchivo,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom((c) =>
      coleccionesPermitidas(c, ['usuarios', 'productos']),
    ),
    validarCampos,
  ],
  // actualizarImagen,
  actualizarImagenCloudinary,
);

// Servicio para mostrar Imagenes
router.get(
  '/:coleccion/:id',
  [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom((c) =>
      coleccionesPermitidas(c, ['usuarios', 'productos']),
    ),
    validarCampos,
  ],
  mostrarImagen,
);

module.exports = router;
