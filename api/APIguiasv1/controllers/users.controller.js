const usersService = require('../services/users.service');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await usersService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const newUser = await usersService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await usersService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
    try {
        const result = await usersService.deleteUser(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ✅ Nueva función: login por nombre de usuario
exports.loginUser = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await usersService.loginUser(name, password);
        if (user === null) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user === false) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({
            message: 'Login successful',
            name: user.name,
            id: user.id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};