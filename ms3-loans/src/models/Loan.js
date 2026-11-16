// src/models/Loan.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Loan = sequelize.define('Loan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bookId: {
    type: DataTypes.STRING(50), // string car MS1 utilise MongoDB ObjectId
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER, // integer car MS2 utilise PostgreSQL SERIAL
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'returned'),
    defaultValue: 'active',
  },
  returnedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'loans',
  timestamps: true,
});

module.exports = Loan;