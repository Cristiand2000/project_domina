CREATE DATABASE IF NOT EXISTS project_domina;
USE project_domina;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  completado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password) VALUES
('prueba', '1234'),
('admin', 'admin');

INSERT INTO tasks (titulo, descripcion, completado) VALUES
('Tarea 1', 'Esta es la primera tarea de prueba', FALSE),
('Tarea 2', 'Segunda tarea para verificar la base de datos', TRUE);
