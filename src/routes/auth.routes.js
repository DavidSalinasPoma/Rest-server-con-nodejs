// Paquete  interno de express
const { Router } = require('express');
// Paquete para realizar validaciones de campos
const { check } = require('express-validator');

// Controlador
const { login } = require('../controllers/auth.controller');

// Activa los middlewares o check
const { validarCampos } = require('../middleware/validar-campos.middleware');

// Controlador

// Utilizamos el Router
const router = Router();

// End Points Ruta login
router.post(
  '/login',
  [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  login,
);

module.exports = router;
