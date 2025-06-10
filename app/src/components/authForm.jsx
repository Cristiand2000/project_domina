import React, { useState } from 'react';

function AuthForm({ onAuthSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    const endpoint = isRegister ? 'register' : 'login';

    try {
      const res = await fetch(`http://localhost:4000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        onAuthSuccess(); 
      } else {
        alert('Usuario registrado con éxito, ahora puedes iniciar sesión');
        setIsRegister(false);
      }

    } catch (err) {
      console.error(err);
      setError('Error del servidor');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>{isRegister ? 'Registro' : 'Iniciar Sesión'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isRegister ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>
      <p>
        {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
        <button onClick={() => setIsRegister(!isRegister)} style={styles.toggle}>
          {isRegister ? 'Inicia sesión' : 'Regístrate'}
        </button>
      </p>
    </div>
  );
}

const styles = {
  input: {
    display: 'block',
    width: '100%',
    marginBottom: 10,
    padding: 8,
    fontSize: 16
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  toggle: {
    background: 'none',
    color: '#007bff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default AuthForm;
