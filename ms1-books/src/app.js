// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Healthcheck (pour Docker et K8S)
app.get('/health', (req, res) => res.status(200).send('ok'));

// Routes
app.use('/api/books', bookRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: 'Route non trouvée' }));

// Démarrage
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 MS1 Books running on port ${PORT}`);
  });
};

start();