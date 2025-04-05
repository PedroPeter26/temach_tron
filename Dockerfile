FROM node:22-bookworm-slim

WORKDIR /app

# 1. Copiar solo los archivos de configuración primero
COPY package.json package-lock.json tsconfig.json ./

# 2. Instalar dependencias
RUN npm install --include=dev

# 3. Copiar toda la estructura de directorios
COPY src ./src
COPY public ./public

# 4. Compilar el proyecto
RUN npm run build

# 5. Comando de inicio
CMD ["npm", "start"]