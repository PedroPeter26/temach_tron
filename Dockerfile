FROM node:22-bookworm-slim

WORKDIR /app

# 1. Copiar archivos de dependencias primero
COPY package.json package-lock.json tsconfig.json ./

# 2. Instalar dependencias (incluyendo devDependencies)
RUN npm install --include=dev

# 3. Copiar el resto de archivos
COPY . .

# 4. Compilar el proyecto
RUN npm run build

# 5. Comando de inicio
CMD ["npm", "start"]