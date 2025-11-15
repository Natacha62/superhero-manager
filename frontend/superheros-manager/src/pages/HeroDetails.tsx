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

  return (
    <div className="hero-details">
      <button onClick={() => navigate(-1)}>⬅ Retour</button>

      <h1>{hero.name ?? 'Nom inconnu'}</h1>
      <img
        src={hero.images?.lg || '/default-hero.png'}
        alt={hero.name ?? 'Héros'}
        style={{ maxWidth: '300px' }}
      />

      <section>
        <h2>Powerstats</h2>
        <ul>
          <li>Intelligence: {hero.powerstats?.intelligence ?? 'Non renseigné'}</li>
          <li>Force: {hero.powerstats?.strength ?? 'Non renseigné'}</li>
          <li>Vitesse: {hero.powerstats?.speed ?? 'Non renseigné'}</li>
          <li>Durabilité: {hero.powerstats?.durability ?? 'Non renseigné'}</li>
          <li>Puissance: {hero.powerstats?.power ?? 'Non renseigné'}</li>
          <li>Combat: {hero.powerstats?.combat ?? 'Non renseigné'}</li>
        </ul>
      </section>

      <section>
        <h2>Apparence</h2>
        <ul>
          <li>Genre: {hero.appearance?.gender ?? 'Non renseigné'}</li>
          <li>Race: {hero.appearance?.race ?? 'Inconnue'}</li>
          <li>Taille: {hero.appearance?.height?.join(', ') ?? 'Non renseigné'}</li>
          <li>Poids: {hero.appearance?.weight?.join(', ') ?? 'Non renseigné'}</li>
          <li>Yeux: {hero.appearance?.eyeColor ?? 'Non renseigné'}</li>
          <li>Cheveux: {hero.appearance?.hairColor ?? 'Non renseigné'}</li>
        </ul>
      </section>

      <section>
        <h2>Biographie</h2>
        <ul>
          <li>Nom complet: {hero.biography?.fullName ?? 'Non renseigné'}</li>
          <li>Alter egos: {hero.biography?.alterEgos ?? 'Non renseigné'}</li>
          <li>Alias: {hero.biography?.aliases?.join(', ') ?? 'Non renseigné'}</li>
          <li>Lieu de naissance: {hero.biography?.placeOfBirth ?? 'Non renseigné'}</li>
          <li>Première apparition: {hero.biography?.firstAppearance ?? 'Non renseigné'}</li>
          <li>Éditeur: {hero.biography?.publisher ?? 'Non renseigné'}</li>
          <li>Alignement: {hero.biography?.alignment ?? 'Non renseigné'}</li>
        </ul>
      </section>

      <section>
        <h2>Travail</h2>
        <p>Occupation: {hero.work?.occupation ?? 'Non renseigné'}</p>
        <p>Base: {hero.work?.base ?? 'Non renseigné'}</p>
      </section>

      <section>
        <h2>Relations</h2>
        <p>Groupes: {hero.connections?.groupAffiliation ?? 'Non renseigné'}</p>
        <p>Famille: {hero.connections?.relatives ?? 'Non renseigné'}</p>
      </section>
    </div>
  );
}
