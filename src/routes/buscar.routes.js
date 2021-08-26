// Paquete  interno de express
const { Router } = require('express');

// Controladores
const { buscar } = require('../controllers/buscar.controller');

// Utilizamos el Router
const router = Router();

// Para Hacer la busqueda generalmente los argumentos se pasan por la url con GET
// Va a buscar la coleccion
// Va a buscar el termino de busqueda
router.get('/:coleccion/:termino', buscar);

module.exports = router;
