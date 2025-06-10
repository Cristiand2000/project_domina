const User = require('../models/authModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: 'Faltan datos' });

  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) return res.status(409).json({ message: 'Usuario ya existe' });

    const userId = await User.create({ username, password });
    res.status(201).json({ message: 'Usuario creado', userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: 'Faltan datos' });

  try {
    const user = await User.findByUsername(username);
    if (!user) return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Autenticación exitosa', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { register, login };

