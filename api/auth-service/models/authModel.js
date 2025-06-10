const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  async create({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const [result] = await db.query(sql, [username, hashedPassword]);
    return result.insertId;
  },

  async findByUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await db.query(sql, [username]);
    return rows[0];
  }
};

module.exports = User;
