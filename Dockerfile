FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev  # Usa npm ci para instalación limpia

COPY . .
RUN npm run build

CMD ["npm", "start"]