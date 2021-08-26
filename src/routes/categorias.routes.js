// Paquete  interno de express
const { Router, response } = require('express');
// Paquete para realizar validaciones de campos
const { check } = require('express-validator');

// Controlladores
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require('../controllers/categorias.controller');

// Validador de ID de categoria
const { existeCategoriaPorId } = require('../helpers/db-validators');

// Validar para que las rutas como privadas
const { validarJWT, esAdminRol } = require('../middleware');

// Activa los middlewares o check
const { validarCampos } = require('../middleware/validar-campos.middleware');

// Utilizando el router de express
const router = Router();

// EndPoints
/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - publico
router.get(
  '/:id',
  // Validar que el id tiene que existir
  [
    check('id', 'No es un ID de Mongo Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId), // Valida si existe el id de categoria
    validarCampos, // Ejecuta todos los check
  ],
  obtenerCategoria,
);

// Crear categorias - privado cualquier persona con un token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearCategoria,
);

// Actualizar una categorias por id - privado cualquiera con token valido
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria,
);

// Dar de baja categoria por id - privado y ADMIN cualquiera con token y ADMIN
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de mongo válido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria,
);

// Esportar la ruta
module.exports = router; // El router exportar sin llaves
