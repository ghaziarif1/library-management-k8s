// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { booksApi } from '../api/client';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    booksApi.get('/api/books')
      .then((res) => setBooks(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>Chargement des livres…</p>;
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>Erreur : {error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Catalogue des livres</h1>
      {books.length === 0 ? (
        <p>Aucun livre pour l'instant. (Le MS1 doit être lancé)</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          {books.map((b) => (
            <Link key={b._id} to={`/books/${b._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h3>{b.title}</h3>
                <p style={{ color: '#555' }}>{b.author}</p>
                <p style={{ fontSize: '0.85rem', color: '#888' }}>Stock : {b.stock}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}