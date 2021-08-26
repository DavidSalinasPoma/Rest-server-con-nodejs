// Para sugerencias de autocompletado
const { request, response } = require('express');
// modelos
const { Categoria } = require('../models');

// CONTROLLADOR PARA OBTENER LAS CATEGORIAS - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
  // 1.- obtener de query params el limite para el paginado
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // 2.-  Ejecutar instrucciones de forma simultanea De forma eficiente
  // Desestructuración de Arreglos
  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query), // total
    Categoria.find(query)
      .populate('usuario', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite)), // paginado
  ]);
  // 3.- Respuesta para el controlador
  res.json({
    total,
    categorias,
  });
};

// CONTROLLADOR PARA OBTENER una CATEGORIA - populate
const obtenerCategoria = async (req = request, res = response) => {
  // 1.- Obtener el id del parametro de segmento
  const { id } = req.params;
  // 2.- Buscar y obtener la categoria por id y el usuario
  const categoria = await Categoria.findById(id).populate('usuario', 'nombre'); // nombre de tabla y campo
  // 3.- Respuesta del servidor al cliente
  res.json({
    categoria,
  });
};

// CONTROLADOR PARA CREAR CATAEGORIAS
const crearCategoria = async (req = request, res = response) => {
  // 1.- Guardar el nombre de la categoria en mayuscula
  const nombre = req.body.nombre.toUpperCase();

  // 2.- Revisar si existe un nombre categoria igual
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    // Si la categoriaDB existe ..crea el error
    return res.status(400).json({
      message: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }

  // 3.- Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  // 4.- Guarda los datos de la categoria en mongoDB
  const categoria = new Categoria(data);
  await categoria.save();

  // 5.- Mandamos la respuesta al cliente
  res.status(201).json({
    // 201 significa que el usuario se creo
    categoria,
  });
};

// CONTROLLADOR PARA ACTUALIZAR una CATEGORIA - VALIDAR DUPLICADOS - populate
const actualizarCategoria = async (req = request, res = response) => {
  // 1.- Obtener el id por parametro de segmento del cliente
  const { id } = req.params;
  // 2.- Validar de que no llegue a la actualización el estado y el usuario
  const { estado, usuario, ...data } = req.body;
  // 3.- Convertimos el nombre en Mayuscula
  data.nombre = data.nombre.toUpperCase();
  // 4.- Saber quien fue quien hizo la ultima modificacion
  data.usuario = req.usuario._id;
  // 5.- actulizar en mongo debe  la categoria
  const categoria = await Categoria.findByIdAndUpdate(id, data, {
    new: true,
  }).populate('usuario', 'nombre'); // { new: true } manda el nuevo documento actualizado

  // 6.- respuesta al cliente
  res.json({
    categoria,
  });
};

// CONTROLLADOR PARA BORRAR una CATEGORIA - ESTADO:FALSE
const borrarCategoria = async (req = request, res = response) => {
  //  1.- Obtener el id por parametro de segmento desde el cliente
  const { id } = req.params;
  // 2.- Borrar categoria del mongo db
  const categoriaBorrada = await Categoria.findByIdAndUpdate(
    id,
    {
      estado: false,
    },
    { new: true }, // Para que se miren los cambios en la respuesta JSON
  );

  // 3.- Respuesta del servidor al cliente
  res.json({
    categoriaBorrada,
  });
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  borrarCategoria,
  actualizarCategoria,
};
