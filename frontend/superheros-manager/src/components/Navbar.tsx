import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './styles/app.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">🦸 SuperHeroes</Link>

      <div className="nav-links">
        <Link to="/">Accueil</Link>

        {user && (user.role === 'admin' || user.role === 'editor') && (
          <Link to="/add">Ajouter un héros</Link>
        )}

        {user ? (
          <>
            <span className="nav-user">Connecté : {user.username} ({user.role})</span>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
}
