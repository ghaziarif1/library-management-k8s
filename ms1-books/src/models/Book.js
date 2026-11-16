// src/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre est obligatoire'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "L'auteur est obligatoire"],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "L'ISBN est obligatoire"],
      unique: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Le stock ne peut pas être négatif'],
      default: 1,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // ajoute createdAt et updatedAt
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('Book', bookSchema);