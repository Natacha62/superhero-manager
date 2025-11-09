import { Link } from 'react-router-dom';
import '../styles/app.css';
import type { SuperHero } from '../types/Hero';

interface HeroCardProps {
  hero: SuperHero;
}

export default function HeroCard({ hero }: HeroCardProps) {
  return (
    <div className="hero-card">
      <img
        src={hero.images?.md || '/images/default.jpg'}
        alt={hero.name}
        onError={(e) => (e.currentTarget.src = '/images/default.jpg')}
      />
      <div className="hero-info">
        <h3>{hero.name}</h3>
        <p><strong>Nom complet :</strong> {hero.biography.fullName}</p>
        <p><strong>Pouvoir :</strong> {hero.powerstats.power}</p>
        <Link to={`/hero/${hero.id}`} className="details-button">
          Détails
        </Link>
      </div>
    </div>
  );
}
