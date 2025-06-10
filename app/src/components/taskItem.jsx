import React, { useState } from 'react';
import TaskEditForm from './taskEditForm';

function TaskItem({ task, onDelete }) {
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(`¿Eliminar "${task.titulo}"?`);
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar');

      onDelete();
    } catch (err) {
      console.error(err.message);
      alert('No se pudo eliminar la tarea');
    }
  };

  const handleChangeStatus = async () => {
    try {
      const nuevoEstado = task.completado ? 0 : 1;

      const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: task.titulo,
          descripcion: task.descripcion,
          completado: nuevoEstado,
        }),
      });

      if (!res.ok) throw new Error('Error al actualizar');

      onDelete();
    } catch (err) {
      console.error(err.message);
      alert('No se pudo cambiar el estado de la tarea');
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  return (
    <li style={styles.container}>
      <div style={styles.text}>
        <strong>{task.titulo}</strong>
        <p>{task.descripcion}</p>
        <span
          style={{
            ...styles.status,
            backgroundColor: task.completado ? '#d4edda' : '#f8d7da',
            color: task.completado ? '#155724' : '#721c24',
          }}
        >
          {task.completado ? 'COMPLETADO' : 'NO COMPLETADO'}
        </span>
      </div>

      <div style={styles.buttons}>
        <button
          onClick={handleChangeStatus}
          style={{ ...styles.button, backgroundColor: '#007bff' }}
        >
          Cambiar Estado
        </button>

        <button
          onClick={toggleEditing}
          style={{ ...styles.button, backgroundColor: '#ffc107', color: '#000' }}
        >
          {editing ? 'Cancelar' : 'Editar'}
        </button>

        <button
          onClick={handleDelete}
          style={{ ...styles.button, backgroundColor: '#dc3545' }}
        >
          Eliminar
        </button>
      </div>

      {editing && (
        <div style={{ marginTop: '10px' }}>
          <TaskEditForm task={task} onUpdated={() => { setEditing(false); onDelete(); }} />
        </div>
      )}
    </li>
  );
}

const styles = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px',
    listStyle: 'none',
    backgroundColor: '#f9f9f9',
  },
  text: {
    marginBottom: '10px',
  },
  status: {
    padding: '4px 10px',
    borderRadius: '5px',
    fontSize: '0.9em',
    display: 'inline-block',
    marginTop: '5px',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  button: {
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default TaskItem;
