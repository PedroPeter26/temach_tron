FROM node:22

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm install

COPY src ./src
COPY public ./public

RUN npm run build

CMD ["node", "--no-warnings", "build/index.js"]