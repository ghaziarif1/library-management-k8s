// src/api/client.js
import axios from 'axios';

// Variables d'environnement Vite (préfixées par VITE_)
// En dev local : .env.development
// En prod/K8S   : injectées au build
const BOOKS_API = import.meta.env.VITE_BOOKS_API_URL || 'http://localhost:3001';
const USERS_API = import.meta.env.VITE_USERS_API_URL || 'http://localhost:3002';
const LOANS_API = import.meta.env.VITE_LOANS_API_URL || 'http://localhost:3003';

export const booksApi = axios.create({ baseURL: BOOKS_API, timeout: 5000 });
export const usersApi = axios.create({ baseURL: USERS_API, timeout: 5000 });
export const loansApi = axios.create({ baseURL: LOANS_API, timeout: 5000 });

// Intercepteur pour logguer les erreurs (utile en dev)
const attachLogger = (instance, name) => {
  instance.interceptors.response.use(
    (r) => r,
    (e) => {
      console.error(`[${name}]`, e.message);
      return Promise.reject(e);
    }
  );
};
attachLogger(booksApi, 'booksApi');
attachLogger(usersApi, 'usersApi');
attachLogger(loansApi, 'loansApi');