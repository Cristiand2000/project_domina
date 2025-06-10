
import React, { useState } from 'react';

function TaskEditForm({ task, onUpdated }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState(task.titulo);
  const [descripcion, setDescripcion] = useState(task.descripcion);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          descripcion,
          completado: task.completado,
        }),
      });

      if (!res.ok) throw new Error('Error al actualizar');

      setMostrarFormulario(false);
      onUpdated(); 
    } catch (err) {
      console.error(err.message);
      alert('No se pudo actualizar la tarea');
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={() => setMostrarFormulario(!mostrarFormulario)} style={styles.toggleButton}>
        {mostrarFormulario ? 'Cancelar' : 'Editar'}
      </button>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.title}>Editar Tarea</h3>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>Guardar cambios</button>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: '10px',
    textAlign: 'center',
  },
  toggleButton: {
    padding: '6px 12px',
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  form: {
    marginTop: '10px',
    backgroundColor: '#fefefe',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  title: {
    fontSize: '18px',
    marginBottom: '5px'
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default TaskEditForm;
