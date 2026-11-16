// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
const loanRoutes = require('./routes/loanRoutes');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.status(200).send('ok'));

app.use('/api/loans', loanRoutes);

app.use((req, res) => res.status(404).json({ error: 'Route non trouvée' }));

const start = async () => {
  await connectDB();
  await sequelize.sync({ alter: false });
  console.log('✅ Tables synchronisées');
  app.listen(PORT, () => {
    console.log(`🚀 MS3 Loans running on port ${PORT}`);
  });
};

start();