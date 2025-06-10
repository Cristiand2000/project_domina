# Project Domina 

**Project Domina** es una aplicación web construida con microservicios usando  Node.js, Express, MySQL, React y utiliza docker  para facilitar el despliegue.

---

## Arquitectura

project_domina/
   docker-compose.yml
   db/
    init.sql   la base de datos
   api/
    auth-service/   autenticación
    task-service/   tareas
   app/  React


# Tecnologías utilizadas

- Frontend: React
- Backend:
  -auth-service: Node.js + Express + JWT + bcrypt
  -task-service: Node.js + Express
- Base de datos: MySQL
- Contenedores: Docker + Docker Compose

# Instalación y ejecución

##  Clonar el repositorio

git clone https://github.com/tu_usuario/project_domina.git
cd project_domina

docker-compose down -v   # Limpia contenedores usarse antes de elproximo comando
docker-compose up --build #Construye y sube contenedores

## Rutas 
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