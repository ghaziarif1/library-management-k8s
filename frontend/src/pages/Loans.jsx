// src/pages/Loans.jsx
import { useEffect, useState } from 'react';
import { loansApi } from '../api/client';

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loansApi.get('/api/loans')
      .then((res) => setLoans(res.data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p style={{ padding: '2rem', color: 'red' }}>Erreur : {error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Emprunts en cours</h1>
      {loans.length === 0 ? (
        <p>Aucun emprunt. (Le MS3 doit être lancé)</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>ID</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>Livre</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>Utilisateur</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((l) => (
              <tr key={l.id}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>{l.id}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>{l.bookId}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>{l.userId}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>{new Date(l.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}