FROM node:18

# Crea y se mueve al directorio de la app
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el código (ahora incluyendo el db.js correctamente desde el contexto general)
COPY . .

# Expone el puerto
EXPOSE 3000

# Ejecuta la app
CMD ["node", "app.js"]
