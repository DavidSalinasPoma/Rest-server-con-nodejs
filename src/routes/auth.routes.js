// Paquete  interno de express
const { Router } = require('express');
// Paquete para realizar validaciones de campos
const { check } = require('express-validator');

// Controlador
const { login, googleSingIn } = require('../controllers/auth.controller');

// Activa los middlewares o check
const { validarCampos } = require('../middleware/validar-campos.middleware');

// Controlador

// Utilizamos el Router
const router = Router();

// End Points Ruta login normal
router.post(
  '/login',
  [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  login,
);

// End Points Ruta google
router.post(
  '/google',
  [
    // Tiene que venir desde el frond el token con el nombre id_token
    check('id_token', 'El id token es necesario').not().isEmpty(),
    validarCampos,
  ],
  googleSingIn,
);

module.exports = router;
