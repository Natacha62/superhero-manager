import { Link } from 'react-router-dom';
import '../styles/app.css';
import type { SuperHero } from '../types/Hero';

interface HeroCardProps {
  hero: SuperHero;
}

export default function HeroCard({ hero }: HeroCardProps) {
  const imagePath = `http://localhost:5000/uploads/${hero.images?.md ?? 'md/default.jpg'}`;

  return (
    <div className="hero-card">
      <img
        src={imagePath}
        alt={hero.name ?? 'Héros'}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = 'http://localhost:5000/uploads/md/default.jpg';
        }}
        className="hero-image"
      />

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

      <div className="hero-actions">
        {/* ✅ Bouton fonctionnel avec ID MongoDB */}
        {hero._id && (
          <Link to={`/hero/${hero._id}`} className="details-button">
            Voir détails
          </Link>
        )}
      </div>
    </div>
  );
}
