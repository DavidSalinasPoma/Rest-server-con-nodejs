// Paquete  interno de express
const { Router } = require('express');

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

router.post('/', usuariosPost);

router.put('/', usuariosPut);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

// Exportando nuestro router
module.exports = router;