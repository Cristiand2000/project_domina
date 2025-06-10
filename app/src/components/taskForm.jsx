import React, { useState } from 'react';

function TaskForm({ onTaskCreated }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaTarea = {
      titulo,
      descripcion,
      completado: false,
    };

    try {
      const res = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaTarea),
      });

      if (!res.ok) throw new Error('Error al crear la tarea');

      setTitulo('');
      setDescripcion('');
      setMostrarFormulario(false); 
      onTaskCreated(); 
    } catch (err) {
      console.error(err.message);
      alert('No se pudo crear la tarea');
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={() => setMostrarFormulario(!mostrarFormulario)} style={styles.toggleButton}>
        {mostrarFormulario ? 'Cancelar' : 'Crear tarea'}
      </button>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Nueva Tarea</h2>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>
            Agregar tarea
          </button>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  toggleButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    maxWidth: '400px',
    margin: '20px auto',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default TaskForm;
