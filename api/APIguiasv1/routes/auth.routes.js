const express = require('express');
const router = express.Router();
const { loginUser } = require('../services/loginService');

router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await loginUser(name, password);
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
