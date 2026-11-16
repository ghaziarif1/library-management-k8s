// src/config/services.js
const axios = require('axios');

const BOOKS_URL = process.env.BOOKS_SERVICE_URL || 'http://localhost:3001';
const USERS_URL = process.env.USERS_SERVICE_URL || 'http://localhost:3002';

const booksClient = axios.create({ baseURL: BOOKS_URL, timeout: 5000 });
const usersClient = axios.create({ baseURL: USERS_URL, timeout: 5000 });

module.exports = { booksClient, usersClient };