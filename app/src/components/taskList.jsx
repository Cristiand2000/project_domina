import React from 'react';
import TaskItem from './taskItem';

function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return <p style={styles.empty}>No hay tareas disponibles</p>;
  }

  return (
    <div style={styles.wrapper}>
      <ul style={styles.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: '600px',
    margin: '30px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  list: {
    padding: 0,
    margin: 0,
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: '40px',
  },
};

export default TaskList;
