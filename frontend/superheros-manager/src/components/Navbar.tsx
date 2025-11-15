import { Link } from 'react-router-dom';
import '../styles/index.css';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="custom-navbar">
      <ul className="navbar-list">
        {/* --- Liens visibles par tous --- */}
        <li>
          <Link to="/" className="navbar-link active">Superhéros</Link>
        </li>
        <li>
          <Link to="/" className="navbar-link faded">Liste des superhéros</Link>
        </li>

        {/* --- Liens selon le rôle --- */}
        {user && (
          <>
            {/* ADMIN */}
            {user.role === 'admin' && (
              <>
                <li>
                  <Link to="/add-hero" className="navbar-link faded">Ajouter un héros</Link>
                </li>
                <li>
                  <Link to="/logs" className="navbar-link faded">Logs</Link>
                </li>
              </>
            )}

            {/* ÉDITEUR */}
            {user.role === 'editeur' && (
              <li>
                <Link to="/add-hero" className="navbar-link faded">Ajouter un héros</Link>
              </li>
            )}

            {/* Informations utilisateur */}
            <li className="navbar-user">
              Connecté : {user.username} ({user.role})
            </li>

            <li>
              <button className="navbar-button" onClick={logout}>Déconnexion</button>
            </li>
          </>
        )}

        {/* --- Liens si non connecté --- */}
        {!user && (
          <>
            <li>
              <Link to="/login" className="navbar-link faded">Connexion</Link>
            </li>
            <li>
              <Link to="/register" className="navbar-link faded">Inscription</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
