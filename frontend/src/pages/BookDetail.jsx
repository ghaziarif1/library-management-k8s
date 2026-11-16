// src/pages/BookDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { booksApi, loansApi } from '../api/client';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    booksApi.get(`/api/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => setMessage({ type: 'error', text: err.message }));
  }, [id]);

  const handleBorrow = async () => {
    if (!userId) return setMessage({ type: 'error', text: 'Entrez un ID utilisateur' });
    try {
      await loansApi.post('/api/loans', { bookId: id, userId });
      setMessage({ type: 'success', text: 'Livre emprunté avec succès !' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || err.message });
    }
  };

  if (!book) return <p style={{ padding: '2rem' }}>Chargement…</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', cursor: 'pointer' }}>← Retour</button>
      <h1>{book.title}</h1>
      <p><strong>Auteur :</strong> {book.author}</p>
      <p><strong>ISBN :</strong> {book.isbn}</p>
      <p><strong>Stock :</strong> {book.stock}</p>

      <hr style={{ margin: '1.5rem 0' }} />
      <h3>Emprunter ce livre</h3>
      <input
        type="text"
        placeholder="ID utilisateur (ex: 1)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '0.5rem', width: '200px' }}
      />
      <button onClick={handleBorrow} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Emprunter</button>
      {message && (
        <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>{message.text}</p>
      )}
    </div>
  );
}