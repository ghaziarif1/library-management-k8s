# ============ Stage 1 : Build ============
FROM node:24-alpine AS build
WORKDIR /app

# Arguments passés au build (pour Vite)
ARG VITE_BOOKS_API_URL=http://localhost:3001
ARG VITE_USERS_API_URL=http://localhost:3002
ARG VITE_LOANS_API_URL=http://localhost:3003
ENV VITE_BOOKS_API_URL=$VITE_BOOKS_API_URL
ENV VITE_USERS_API_URL=$VITE_USERS_API_URL
ENV VITE_LOANS_API_URL=$VITE_LOANS_API_URL

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ============ Stage 2 : Runtime ============
FROM nginx:1.27-alpine

# Créer l'utilisateur et lui donner les droits sur les dossiers Nginx
RUN addgroup -S app && adduser -S app -G app \
    && chown -R app:app /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx \
    && touch /var/run/nginx.pid \
    && chown -R app:app /var/run/nginx.pid

COPY --from=build --chown=app:app /app/dist /usr/share/nginx/html
COPY --chown=app:app nginx.conf /etc/nginx/conf.d/default.conf

USER app
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]