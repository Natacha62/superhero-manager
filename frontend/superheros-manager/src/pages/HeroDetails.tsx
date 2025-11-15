import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHeroById } from '../api/heroApi';
import type { SuperHero } from '../types/Hero';

export default function HeroDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState<SuperHero | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID manquant dans l’URL.');
      return;
    }

    getHeroById(id)
      .then((data) => {
        setHero(data);
        setError(null);
      })
      .catch((err) => {
        console.error('Erreur getHeroById:', err);
        setError('Impossible de charger ce héros.');
      });
  }, [id]);

  if (!id) return <p>Identifiant invalide.</p>;
  if (error) return <p>{error}</p>;
  if (!hero) return <p>Chargement...</p>;

  const imagePath = `http://localhost:5000/uploads/${hero.images?.lg ?? 'lg/default.jpg'}`;

  return (
    <div className="hero-details">
      <button onClick={() => navigate(-1)} className="back-button">⬅ Retour</button>

      <div className="hero-details-layout">
        <div className="hero-details-image">
          <img src={imagePath} alt={hero.name} className="hero-image" />
        </div>

        <div className="hero-details-info">
          <h1 className="hero-name">{hero.name}</h1>

          <div className="hero-section">
            <h2>🧠 Powerstats</h2>
            <ul>
              <li>Intelligence: {hero.powerstats?.intelligence}</li>
              <li>Force: {hero.powerstats?.strength}</li>
              <li>Vitesse: {hero.powerstats?.speed}</li>
              <li>Durabilité: {hero.powerstats?.durability}</li>
              <li>Puissance: {hero.powerstats?.power}</li>
              <li>Combat: {hero.powerstats?.combat}</li>
            </ul>
          </div>

          <div className="hero-section">
            <h2>🧬 Apparence</h2>
            <ul>
              <li>Genre: {hero.appearance?.gender}</li>
              <li>Race: {hero.appearance?.race}</li>
              <li>Taille: {hero.appearance?.height?.join(', ')}</li>
              <li>Poids: {hero.appearance?.weight?.join(', ')}</li>
              <li>Yeux: {hero.appearance?.eyeColor}</li>
              <li>Cheveux: {hero.appearance?.hairColor}</li>
            </ul>
          </div>

          <div className="hero-section">
            <h2>📖 Biographie</h2>
            <ul>
              <li>Nom complet: {hero.biography?.fullName}</li>
              <li>Alter egos: {hero.biography?.alterEgos}</li>
              <li>Alias: {hero.biography?.aliases?.join(', ')}</li>
              <li>Lieu de naissance: {hero.biography?.placeOfBirth}</li>
              <li>Première apparition: {hero.biography?.firstAppearance}</li>
              <li>Éditeur: {hero.biography?.publisher}</li>
              <li>Alignement: {hero.biography?.alignment}</li>
            </ul>
          </div>

          <div className="hero-section">
            <h2>💼 Travail</h2>
            <p>Occupation: {hero.work?.occupation}</p>
            <p>Base: {hero.work?.base}</p>
          </div>

          <div className="hero-section">
            <h2>👥 Relations</h2>
            <p>Groupes: {hero.connections?.groupAffiliation}</p>
            <p>Famille: {hero.connections?.relatives}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
