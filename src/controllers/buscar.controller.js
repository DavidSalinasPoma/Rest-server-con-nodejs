// Para el autocompletado
const { request, response } = require('express');
// Mongosse
const { ObjectId } = require('mongoose').Types;

// Modelos
const { Usuario, Categoria, Producto } = require('../models');

// Colecciones permitidas para las busquedas
const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles'];

// Tecnica para buscar Usuarios
const buscarUsuarios = async (termino = '', res = response) => {
  // Verificamos si es un ID mongosse valido
  const esMongoID = ObjectId.isValid(termino); // Si es valido retorna true
  if (esMongoID) {
    // Busca por el ID MONGO VALIDO
    const usuario = await Usuario.findById(termino);

    // Respuesta al cliente
    return res.json({
      // return es para que ya no siga ejecutando nada de la funcion
      // Ternario
      results: usuario ? [usuario] : [],
    });
  }

  // Tecnica para busquedas Insensibles 'i'.- significa insensible
  const regex = new RegExp(termino, 'i');

  // Buscar por NOMBRE de USUARIO devuelve varios usuarios en []
  const usuarios = await Usuario.find({
    // se puede utilizar tambien count
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  res.json({
    results: usuarios,
  });
};

// Tecnica para buscar Categorias
const buscarCategorias = async (termino = '', res = response) => {
  // Verificamos si es un ID mongosse valido
  const esMongoID = ObjectId.isValid(termino); // Si es valido retorna true
  if (esMongoID) {
    // Busca por el ID MONGO VALIDO
    const categoria = await Categoria.findById(termino);

    // Respuesta al cliente
    return res.json({
      // return es para que ya no siga ejecutando nada de la funcion
      // Ternario
      results: categoria ? [categoria] : [],
    });
  }

  // Tecnica para busquedas Insensibles 'i'.- significa insensible
  const regex = new RegExp(termino, 'i');

  // Buscar por NOMBRE de USUARIO devuelve varios usuarios en []
  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  });
  res.json({
    results: categorias,
  });
};

// Tecnica para buscar Productos
const buscarProductos = async (termino = '', res = response) => {
  // Verificamos si es un ID mongosse valido
  const esMongoID = ObjectId.isValid(termino); // Si es valido retorna true
  if (esMongoID) {
    // Busca por el ID MONGO VALIDO
    const producto = await Producto.findById(termino).populate(
      'categoria',
      'nombre',
    );

    // Respuesta al cliente
    return res.json({
      // return es para que ya no siga ejecutando nada de la funcion
      // Ternario
      results: producto ? [producto] : [],
    });
  }

  // Tecnica para busquedas Insensibles 'i'.- significa insensible
  const regex = new RegExp(termino, 'i');

  // Buscar por NOMBRE de PRODUCTO devuelve varios usuarios en []
  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate('categoria', 'nombre');
  res.json({
    results: productos,
  });
};

// Buscar todos los productos cuya categoria sea galletas
// todo: Por hacer

// CONTROLADOR BUSCAR
const buscar = (req = request, res = response) => {
  // 1.- Obtenemos de los parametros de segmento dos datos
  // Debe ser los mismos nombre definidos en la ruta de busquedas
  const { coleccion, termino } = req.params;

  // 2.- Verificar si la colleccion esta en las colleccionesPermitidas
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      message: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }
  // 3.-Match con el parametro de segmento COLECCION
  switch (coleccion) {
    case 'usuarios':
      buscarUsuarios(termino, res);
      break;
    case 'categorias':
      buscarCategorias(termino, res);
      break;
    case 'productos':
      buscarProductos(termino, res);
      break;

    default:
      // respuesta 500 es problema del servidor del backend
      res.status(500).json({
        message: 'Se le olvido hacer esta busqueda',
      });
  }
};

module.exports = {
  buscar,
};
