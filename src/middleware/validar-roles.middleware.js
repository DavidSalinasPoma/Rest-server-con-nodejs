const { request, response } = require('express');

const esAdminRol = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      message: 'Se require verificar el role sin validar el token primero',
    });
  }

  // Desestructuramos al usuario
  const { rol, nombre } = req.usuario;
  // Validacion si es administrador o no
  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      message: `${nombre} no es administrador - no se puede hacer esto`,
    });
  }

  next();
};

// Cuando un usuario tiene Varios ROLES en el Sistema
// ...roles recibe todos los parametros de entrada
const tieneRoles = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        message: 'Se require verificar el role sin validar el token primero',
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        message: `El servicio requiere uno de estos roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  esAdminRol,
  tieneRoles,
};

// Este esAdminRole se tiene que llamar despues de validar el validarJWT de las rutas
