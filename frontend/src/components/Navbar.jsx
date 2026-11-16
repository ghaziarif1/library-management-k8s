// src/components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      background: '#1e293b',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
        📚 LibraryMS
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <NavLink to="/" style={({ isActive }) => ({
          color: isActive ? '#60a5fa' : 'white',
          textDecoration: 'none'
        })}>Livres</NavLink>
        <NavLink to="/loans" style={({ isActive }) => ({
          color: isActive ? '#60a5fa' : 'white',
          textDecoration: 'none'
        })}>Emprunts</NavLink>
      </div>
    </nav>
  );
}