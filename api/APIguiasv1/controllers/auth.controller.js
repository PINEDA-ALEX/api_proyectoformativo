const authService = require('../services/auth.service');

exports.loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: 'Name and password are required' });
    }

    const user = await authService.loginUser(name, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      fkidRole: user.fkidRole,        // ✅ Importante
      fkidSpecialty: user.fkidSpecialty,
      Rol: user.Rol,                   // ✅ Importante
      Specialty: user.Specialty,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
