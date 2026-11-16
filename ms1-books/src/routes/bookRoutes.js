// src/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);
router.post('/', controller.createBook);
router.patch('/:id/stock', controller.updateStock);
router.delete('/:id', controller.deleteBook);

module.exports = router;