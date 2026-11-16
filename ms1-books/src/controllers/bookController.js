// src/controllers/bookController.js
const Book = require('../models/Book');

// GET /api/books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Livre non trouvé' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/books
exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, stock, description } = req.body;
    if (!title || !author || !isbn) {
      return res.status(400).json({ error: 'title, author et isbn sont requis' });
    }
    const book = await Book.create({ title, author, isbn, stock, description });
    res.status(201).json(book);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Cet ISBN existe déjà' });
    }
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/books/:id/stock (utilisé par MS3 Loans)
exports.updateStock = async (req, res) => {
  try {
    const { delta } = req.body; // -1 pour emprunt, +1 pour retour
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Livre non trouvé' });

    const newStock = book.stock + delta;
    if (newStock < 0) {
      return res.status(400).json({ error: 'Stock insuffisant' });
    }

    book.stock = newStock;
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Livre non trouvé' });
    res.json({ message: 'Livre supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};