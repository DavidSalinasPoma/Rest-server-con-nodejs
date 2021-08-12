// Paquete  interno de express
const { Router } = require('express');
// Paquete para realizar validaciones de campos
const { check } = require('express-validator');

// middleware personalizado para hacer validaciones
// const { validarCampos } = require('../middleware/validar-campos.middleware');
// const { validarJWT } = require('../middleware/validar-jwt.middleware');
// const {
//   esAdminRol,
//   tieneRoles,
// } = require('../middleware/validar-roles.middleware');

const {
  validarCampos,
  validarJWT,
  esAdminRol,
  tieneRoles,
} = require('../middleware'); //Directo de la carpeta por que tiene index.js

// Controladores
const {
  usuariosPatch,
  usuariosPost,
  usuariosGet,
  usuariosDelete,
  usuariosPut,
} = require('../controllers/usuarios.controller');

// Validador para saber si hay un rol en la bd
const {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
} = require('../helpers/db-validators');

// Utilizamos el Router
const router = Router();

// End Points
router.get('/', usuariosGet);

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // si no esta vacio?
    check(
      'password',
      'El password es obligatorio y debe ser de 6 letras o mas',
    ).isLength({ min: 6 }), // si no esta vacio?
    check('correo', 'El correo no es valido').isEmail(),
    // Validando Email duplicados
    check('correo').custom(existeEmail),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos, // midlewares que activa la validacion de los middlewares en la ruta
  ],
  usuariosPost,
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos, // midlewares que activa el validar campos
  ],
  usuariosPut,
); // recibe el id de la URL

router.delete(
  '/:id',
  [
    // Validaciones
    validarJWT, // protege la ruta con JWT
    // esAdminRol, // Elimina si existe el rol ADMIN_ROLE
    tieneRoles('ADMIN_ROLE', 'VENTAS_ROLE0', 'DSP_ROLE'),
    check('id', 'No es un ID valido').isMongoId(), // Que el id sea valido
    check('id').custom(existeUsuarioPorId), // Que el id exista en la BD
    validarCampos, // midlewares que activa el validar campos, por que esta utilizando el check
  ],
  usuariosDelete,
);

router.patch('/', usuariosPatch);

// Exportando nuestro router
module.exports = router;
