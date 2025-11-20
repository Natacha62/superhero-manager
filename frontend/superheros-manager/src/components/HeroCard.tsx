import { Link } from 'react-router-dom';
import '../styles/app.css';
import type { SuperHero } from '../types/Hero';
import { useAuth } from '../hooks/useAuth';

interface HeroCardProps {
  hero: SuperHero;
  onDelete?: (id: string) => void;
}

export default function HeroCard({ hero, onDelete }: HeroCardProps) {
  const imagePath = `http://localhost:5000/uploads/images/${hero.images?.md ?? 'md/default.jpg'}`;

  const { user } = useAuth();
  const canDelete = user?.role === 'admin';

  const handleDelete = () => {
    const rawId = hero._id ?? hero.id;
    const id = rawId != null ? String(rawId) : null;

    if (!id) {
      console.warn("ID du héros introuvable");
      return;
    }
    if (window.confirm(`Supprimer ${hero.name} ?`)) {
      onDelete?.(id);
    }
  };

  return (
    <div className="hero-card">
      {/* Image */}
      <img
        src={imagePath}
        alt={hero.name ?? 'Héros'}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = 'http://localhost:5000/uploads/images/md/default.jpg';
        }}
        className="hero-image"
      />

      {/* Infos */}
      <div className="hero-info">
        <h3 className="hero-name">{hero.name ?? 'Nom inconnu'}</h3>
        <p className="hero-fullname">
          <strong>Nom complet :</strong> {hero.biography?.fullName || 'Inconnu'}
        </p>
        <p className="hero-universe">
          <strong>Univers :</strong> {hero.biography?.publisher || 'Inconnu'}
        </p>
        <p className="hero-power">
          <strong>Pouvoir :</strong> {hero.powerstats?.power ?? 'N/A'}
        </p>
      </div>

      {/* Actions */}
      <div className={`hero-actions ${canDelete ? '' : 'centered'}`}>
        <Link to={`/hero/${hero._id ?? hero.id}`} className="details-button">
          Voir détails
        </Link>

        {canDelete && (
          <button onClick={handleDelete} className="delete-button">
            🗑️ Supprimer
          </button>
        )}
      </div>
    </div>
  );
}
