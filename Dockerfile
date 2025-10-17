# syntax=docker/dockerfile:1
FROM node:20-alpine

# Dossier de travail dans l'image
WORKDIR /app

# Installer les deps en profitant du cache
COPY package*.json ./
RUN npm ci --omit=dev

# Copier le code
COPY . .

# Variables d'env par défaut
ENV NODE_ENV=production

# Port exposé par l'app
EXPOSE 3000

# Commande de démarrage
CMD ["node", "server.js"]
