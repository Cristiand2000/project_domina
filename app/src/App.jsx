import React, { useEffect, useState } from 'react';
import TaskList from './components/taskList';
import TaskForm from './components/taskForm';
import AuthForm from './components/authForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        return;
      }

      if (!response.ok) throw new Error('Error al obtener las tareas');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <AuthForm onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Lista de Tareas</h1>
      <button onClick={() => { localStorage.removeItem('token'); setIsAuthenticated(false); }}>Cerrar Sesión</button>
      <TaskForm onTaskCreated={fetchTasks} />
      {loading ? <p>Cargando tareas...</p> : <TaskList tasks={tasks} onDelete={fetchTasks} />}
    </div>
  );
}

export default App;
