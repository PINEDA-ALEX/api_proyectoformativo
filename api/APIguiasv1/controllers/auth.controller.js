// loginService.js
const db = require('../../../models');
const bcrypt = require('bcryptjs'); // si usas contraseñas encriptadas

exports.loginUser = async (name, password) => {
  // Buscar por nombre de usuario
  const user = await db.User.findOne({ where: { name } });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Comparar contraseñas (si están encriptadas)
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Contraseña incorrecta');
  }

  // Retornar datos (puedes generar un token JWT si lo necesitas)
  return {
    id: user.id,
    name: user.name,
    rol: user.rol,
  };
};
