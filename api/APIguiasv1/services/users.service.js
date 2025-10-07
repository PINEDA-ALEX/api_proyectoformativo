const db = require('../../../models'); // Asegúrate de que esta ruta sea correcta
const bcrypt = require('bcrypt');

// Obtener todos los usuarios, incluyendo sus roles y especialidades
exports.getAllUsers = async () => {
    return db.User.findAll({
        include: [
            { model: db.Rols }, // Usamos el nombre del modelo que definiste en tu proyecto
            { model: db.Specialty }
        ]
    });
};

// Obtener un usuario por ID, incluyendo sus roles y especialidades
exports.getUserById = async (id) => {
    return db.User.findByPk(id, {
        include: [
            { model: db.Rols },
            { model: db.Specialty }
        ]
    });
};

// Crear un nuevo usuario
exports.createUser = async (userData) => {
    return db.User.create(userData);
};

// Actualizar un usuario existente
exports.updateUser = async (id, userData) => {
    const user = await db.User.findByPk(id);
    if (!user) {
        return null; // Devuelve nulo si el usuario no existe
    }
    await user.update(userData);
    return user;
};

// Eliminar un usuario
exports.deleteUser = async (id) => {
    const user = await db.User.findByPk(id);
    if (!user) {
        return false; // Devuelve falso si el usuario no existe
    }
    await user.destroy();
    return true;
};

// ✅ Nueva función: login por nombre de usuario
exports.loginUser = async (name, password) => {
    const user = await db.User.findOne({ where: { name } });
    if (!user) return null;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return false;

    return user;
};