const db = require('../../../models');
const bcrypt = require('bcrypt');

exports.loginUser = async (name, password) => {
  // Buscar usuario por nombre
  const user = await db.User.findOne({ where: { name } });

  if (!user) {
    return null;
  }

  // Comparar contraseñas
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  return user;
};
