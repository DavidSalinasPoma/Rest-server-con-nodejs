// Paquete  interno de express
const { Router } = require('express');
// Paquete para realizar validaciones de campos
const { check } = require('express-validator');

// middleware personalizado para hacer validaciones
const { validarCampos } = require('../middleware/validar-campos.middleware');

// Controladores
const {
  usuariosPatch,
  usuariosPost,
  usuariosGet,
  usuariosDelete,
  usuariosPut,
} = require('../controllers/usuarios.controller');

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
    check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos, // midlewares que activa el validar campos
  ],
  usuariosPost,
);

router.put('/:id', usuariosPut); // recibe el id de la URL

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

// Exportando nuestro router
module.exports = router;
