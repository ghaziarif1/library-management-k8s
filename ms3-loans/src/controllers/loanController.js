// src/controllers/loanController.js
const Loan = require('../models/Loan');
const { booksClient, usersClient } = require('../config/services');

// GET /api/loans
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({ order: [['createdAt', 'DESC']] });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/loans/:id
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ error: 'Emprunt non trouvé' });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/loans
exports.createLoan = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    if (!bookId || !userId) {
      return res.status(400).json({ error: 'bookId et userId sont requis' });
    }

    // 1. Vérifier que l'utilisateur existe (MS2)
    try {
      await usersClient.get(`/api/users/${userId}`);
    } catch (err) {
      if (err.response?.status === 404) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      return res.status(503).json({ error: 'Service utilisateurs indisponible' });
    }

    // 2. Vérifier que le livre existe (MS1)
    let book;
    try {
      const { data } = await booksClient.get(`/api/books/${bookId}`);
      book = data;
    } catch (err) {
      if (err.response?.status === 404) {
        return res.status(404).json({ error: 'Livre non trouvé' });
      }
      return res.status(503).json({ error: 'Service livres indisponible' });
    }

    // 3. Vérifier le stock
    if (book.stock <= 0) {
      return res.status(400).json({ error: 'Livre en rupture de stock' });
    }

    // 4. Décrémenter le stock (MS1)
    try {
      await booksClient.patch(`/api/books/${bookId}/stock`, { delta: -1 });
    } catch (err) {
      return res.status(503).json({ error: 'Impossible de mettre à jour le stock' });
    }

    // 5. Créer l'emprunt
    const loan = await Loan.create({ bookId, userId, status: 'active' });
    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/loans/:id/return
exports.returnLoan = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ error: 'Emprunt non trouvé' });
    if (loan.status === 'returned') {
      return res.status(400).json({ error: 'Ce livre a déjà été rendu' });
    }

    // Remettre le stock à +1 (MS1)
    try {
      await booksClient.patch(`/api/books/${loan.bookId}/stock`, { delta: +1 });
    } catch (err) {
      return res.status(503).json({ error: 'Impossible de mettre à jour le stock' });
    }

    loan.status = 'returned';
    loan.returnedAt = new Date();
    await loan.save();

    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};