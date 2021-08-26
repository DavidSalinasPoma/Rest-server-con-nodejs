// Paquete  interno de express
const { Router } = require('express');
// Paquete para realizar validaciones de campos
const { check } = require('express-validator');

// Controlladores
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require('../controllers/productos.controller');

// Validador de ID de Categoria y Validar que exista ID de productos
const {
  existeCategoriaPorId,
  existeProductoPorId,
} = require('../helpers/db-validators');

// Validar para que las rutas como privadas
const { validarJWT, esAdminRol } = require('../middleware');

// Activa los middlewares o check
const { validarCampos } = require('../middleware/validar-campos.middleware');

// Utilizando el router de express
const router = Router();

// EndPoints
/**
 * {{url}}/api/Productos
 */

// Obtener todas las Productos publico
router.get('/', obtenerProductos);

// Obtener una Producto por id - publico
router.get(
  '/:id',
  // Validar que el id tiene que existir
  [
    check('id', 'No es un ID de Mongo Valido').isMongoId(),
    check('id').custom(existeProductoPorId), // Valida si existe el id de Producto
    validarCampos, // Ejecuta todos los check
  ],
  obtenerProducto,
);

// Crear Productos - privado cualquier persona con un token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo Valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto,
);

// Actualizar una Productos por id - privado cualquiera con token valido
router.put(
  '/:id',
  [
    validarJWT,
    // check('categoria', 'No es un ID mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto,
);

// Dar de baja Producto por id - privado y ADMIN cualquiera con token y ADMIN
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de mongo válido').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto,
);

// Esportar la ruta
module.exports = router; // El router exportar sin llaves
