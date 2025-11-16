import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, register as registerApi } from '../api/authApi';
import type { AuthResponse } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';

export default function LoginRegisterPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('editor');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        console.log('📤 Données envoyées à registerApi :', { username, password, role });

        const data: AuthResponse = await registerApi(username, password, role);
        login(data.token, data.user);
        navigate('/');
      } else {
        console.log('📤 Données envoyées à loginApi :', { username, password });

        const data: AuthResponse = await loginApi(username, password);
        login(data.token, data.user);
        navigate('/');
      }
    } catch (err: any) {
      console.error('❌ Erreur Axios :', err);
      const backendMessage = err.response?.data?.message;
      setError(backendMessage || (isRegister ? 'Erreur lors de l’inscription' : 'Identifiants incorrects'));
    }
  };

  if (user) {
    return (
      <div className="account-container">
        <h2>Bienvenue {user.username} 🎉</h2>
        <p><strong>Rôle :</strong> {user.role}</p>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Se déconnecter
        </button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Inscription' : 'Connexion'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isRegister && (
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Utilisateur</option>
            <option value="editor">Éditeur</option>
            <option value="admin">Administrateur</option>
          </select>
        )}

        <button type="submit">{isRegister ? 'S’inscrire' : 'Se connecter'}</button>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>

      <p>
        {isRegister ? 'Déjà inscrit ?' : 'Pas encore de compte ?'}{' '}
        <button type="button" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Se connecter' : 'Créer un compte'}
        </button>
      </p>
    </div>
  );
}
