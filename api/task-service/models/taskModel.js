const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM tasks');
  return rows;
};


exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0];
};

exports.create = async (task) => {
  return db.query(
    'INSERT INTO tasks (titulo, descripcion, completado) VALUES (?, ?, ?)',
    [task.titulo, task.descripcion, task.completado || false]
  );
};


exports.update = async (id, { titulo, descripcion, completado }) => {
  const [result] = await db.query(
    'UPDATE tasks SET titulo = ?, descripcion = ?, completado = ? WHERE id = ?',
    [titulo, descripcion, completado, id]
  );
  return result.affectedRows > 0;
};

exports.getByTitulo = (titulo) => {
  return db.query('SELECT * FROM tasks WHERE titulo = ?', [titulo]);
};



exports.remove = async (id) => {
  const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
