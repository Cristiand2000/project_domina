const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
    res.status(500).json({ message: 'Error interno del servidor' });

  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.getById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { titulo, descripcion, completado } = req.body;

    const [existingTask] = await Task.getByTitulo(titulo);
    if (existingTask.length > 0) {
      return res.status(400).json({ error: 'Ya existe una tarea con ese título' });
    }

    const [result] = await Task.create({ titulo, descripcion, completado });
    res.status(201).json({
      message: 'Tarea creada exitosamente',
      id: result.insertId,
      titulo,
      descripcion,
      completado: completado || false
    });
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const success = await Task.update(req.params.id, req.body);
    if (!success) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ message: 'Tarea actualizada correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la tarea' });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const success = await Task.remove(req.params.id);
    if (!success) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};
