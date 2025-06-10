# Imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /api/auth-service

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias (¡esto es clave!)
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto
EXPOSE 4000

# Comando para arrancar el servicio
CMD ["node", "app.js"]
