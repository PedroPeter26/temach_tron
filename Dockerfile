FROM node:22-bookworm-slim
WORKDIR /app

# Instala dependencias de construcción esenciales
RUN apt-get update && apt-get install -y \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Primero copia solo los archivos para instalar dependencias
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Luego copia el resto y construye
COPY . .
RUN npm run build

CMD ["npm", "start"]