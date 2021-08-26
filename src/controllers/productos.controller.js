// Para sugerencias de autocompletado
const { request, response } = require('express');
// modelos
const { Categoria, Producto } = require('../models');

// CONTROLLADOR PARA OBTENER LAS PRODUCTOS - paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {
  // 1.- obtener de query params el limite para el paginado
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // 2.-  Ejecutar instrucciones de forma simultanea De forma eficiente
  // Desestructuración de Arreglos
  const [total, productos] = await Promise.all([
    Producto.countDocuments(query), // total
    Producto.find(query)
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite)), // paginado
  ]);
  // 3.- Respuesta para el controlador
  res.json({
    total,
    productos,
  });
};

// CONTROLLADOR PARA OBTENER un PRODUCTO - populate
const obtenerProducto = async (req = request, res = response) => {
  // 1.- Obtener el id del parametro de segmento
  const { id } = req.params;
  // 2.- Buscar y obtener la Producto por id y el usuario
  const producto = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre'); // nombre de tabla y campo
  // 3.- Respuesta del servidor al cliente
  res.json({
    producto,
  });
};

// 1.- CONTROLADOR PARA CREAR PRODUCTOS
const crearProducto = async (req = request, res = response) => {
  // 1.- Guardar el nombre del producto en minuscula
  const { estado, usuario, ...nuevaData } = req.body;

  // 2.- Revisar si existe un nombre del producto igual
  const productoDB = await Producto.findOne({ nombre: nuevaData.nombre });
  if (productoDB) {
    // Si la productoDB existe ..crea el error
    return res.status(400).json({
      message: `El producto: ${productoDB.nombre} ya existe`,
    });
  }

  // 3.- Generar la data a guardar
  const data = {
    ...nuevaData,
    nombre: nuevaData.nombre.toUpperCase(),
    usuario: req.usuario._id, // El usuario quien lo crea
  };

  // 4.- Guarda los datos de los productos en mongoDB
  const producto = new Producto(data);
  await producto.save();

  // 5.- Mandamos la respuesta al cliente
  res.status(201).json({
    // 201 significa que el usuario se creo
    producto,
  });
};

// CONTROLLADOR PARA ACTUALIZAR un PRODUCTO - VALIDAR DUPLICADOS - populate
const actualizarProducto = async (req = request, res = response) => {
  // 1.- Obtener el id por parametro de segmento del cliente
  const { id } = req.params;
  // 2.- Validar de que no llegue a la actualización el estado y el usuario
  const { estado, usuario, ...data } = req.body;
  // 3.- Convertimos el nombre en Mayuscula
  // validar si vine el nombre para hacer la conversion a mayusculas
  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }
  // 4.- Saber quien fue quien hizo la ultima modificacion
  data.usuario = req.usuario._id;
  // 5.- actulizar por ID en mongo el producto
  const producto = await Producto.findByIdAndUpdate(id, data, {
    new: true,
  })
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre'); // { new: true } manda el nuevo documento actualizado

  // 6.- respuesta al cliente
  res.json({
    producto,
  });
};

// CONTROLLADOR PARA BORRAR un PRODUCTO - ESTADO:FALSE
const borrarProducto = async (req = request, res = response) => {
  //  1.- Obtener el id por parametro de segmento desde el cliente
  const { id } = req.params;
  // 2.- Borrar producto del mongo db
  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    {
      estado: false,
    },
    { new: true }, // Para que se miren los cambios en la respuesta JSON
  );

  // 3.- Respuesta del servidor al cliente
  res.json({
    productoBorrado,
  });
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  borrarProducto,
  actualizarProducto,
};
