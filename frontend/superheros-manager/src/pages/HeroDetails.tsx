import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHeroById } from '../api/heroApi';
import type { SuperHero } from '../types/Hero';

export default function HeroDetails() {
  const { id } = useParams();
  const [hero, setHero] = useState<SuperHero | null>(null);

  useEffect(() => {
    if (id) {
      getHeroById(Number(id)).then(setHero);
    }
  }, [id]);

  if (!hero) return <p>Chargement...</p>;

  return (
    <div>
      <h2>{hero.name}</h2>
      <img
        src={hero.images?.md || '/images/default.jpg'}
        alt={hero.name}
        onError={(e) => (e.currentTarget.src = '/images/default.jpg')}
      />
      <p><strong>Pouvoir :</strong> {hero.powerstats.power}</p>
      <p><strong>Nom complet :</strong> {hero.biography.fullName}</p>
      <Link to="/">← Retour</Link>
    </div>
  );
}

