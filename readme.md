# Project Domina 🧠

**Project Domina** es una aplicación web construida con arquitectura de microservicios para gestionar usuarios y tareas. Utiliza **Node.js**, **Express**, **MySQL**, **React**, y está completamente dockerizada para facilitar el despliegue.

---

## 🧱 Arquitectura

project_domina/
├── docker-compose.yml
├── db/
│ └── init.sql  Script para inicializar la base de datos
├── api/
│ ├── auth-service/  Microservicio de autenticación
│ └── task-service/  Microservicio de gestión de tareas
└── app/  Frontend en React


## 🚀 Tecnologías utilizadas

- **Frontend**: React + Vite
- **Backend**:
  - `auth-service`: Node.js + Express + JWT + bcrypt
  - `task-service`: Node.js + Express
- **Base de datos**: MySQL
- **Contenedores**: Docker + Docker Compose

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu_usuario/project_domina.git
cd project_domina

cambiar .env.example a .env

docker-compose down -v   # Limpia contenedores y volúmenes (opcional, pero útil en la primera instalación)
docker-compose up --build


Servicio	Puerto local
Frontend React	http://localhost:5173
Auth Service	http://localhost:4000
Task Service	http://localhost:3000
MySQL DB	localhost:3308 internamente usa 3306

Auth Service /api/auth-service
POST /register – Registro de usuario

POST /login – Login y obtención de token JWT

Task Service /api/task-service
GET /tasks – Obtener tareas

POST /tasks – Crear tarea

PUT /tasks/:id – Actualizar tarea

DELETE /tasks/:id – Eliminar tarea

Todos los endpoints del Task Service requieren autenticación con JW