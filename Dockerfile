FROM node:22

WORKDIR /app

# 1. Copiar primero solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# 2. Instalar TODAS las dependencias (incluyendo devDependencies)
RUN npm install

# 3. Copiar el resto de los archivos
COPY . .

# 4. Compilar el proyecto
RUN npm run build

# 5. Comando de inicio
CMD ["npm", "start"]