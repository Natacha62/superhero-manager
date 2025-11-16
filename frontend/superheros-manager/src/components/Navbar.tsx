import { Link } from 'react-router-dom';
import '../styles/index.css';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  const roleLabel: Record<string, string> = {
    admin: 'Administrateur',
    editor: 'Éditeur',
    user: 'Utilisateur'
  };

  // On mappe le rôle vers une classe CSS
  const roleClass = user
    ? `navbar-${user.role}` // admin → navbar-admin, editor → navbar-editor, user → navbar-user
    : 'navbar-guest';

  return (
    <nav className={`custom-navbar ${roleClass}`}>
      <div className="nav-inner">
        <ul className="navbar-list">
          <li><Link to="/" className="navbar-link active">Superhéros</Link></li>
          <li><Link to="/" className="navbar-link faded">Liste des superhéros</Link></li>

          {user && (
            <>
              {user.role === 'admin' && (
                <>
                  <li><Link to="/add-hero" className="navbar-link faded">Ajouter un héros</Link></li>
                  <li><Link to="/logs" className="navbar-link faded">Logs</Link></li>
                </>
              )}

              {user.role === 'editor' && (
                <li><Link to="/add-hero" className="navbar-link faded">Ajouter un héros</Link></li>
              )}

              <li className="navbar-welcome">
                Bienvenue <strong>{user.username}</strong>{' '}
                <em>({roleLabel[user.role] ?? user.role})</em>
              </li>
              <li>
                <button className="navbar-button" onClick={logout}>Déconnexion</button>
              </li>
            </>
          )}

          {!user && (
            <li><Link to="/login" className="navbar-link faded">Connexion / Inscription</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}
