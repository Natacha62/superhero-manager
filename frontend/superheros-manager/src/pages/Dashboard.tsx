import { useEffect, useState } from 'react';
import { getSuperHeroes } from '../api/heroApi';
import HeroCard from '../components/HeroCard';
import SearchBar from '../components/SearchBar';
import type { SuperHero } from '../types/Hero';

export default function Dashboard() {
  const [heroes, setHeroes] = useState<SuperHero[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<SuperHero[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(50);

  useEffect(() => {
    getSuperHeroes()
      .then(data => {
        const validData = Array.isArray(data.superheros) ? data.superheros : [];
        setHeroes(validData);
        setFilteredHeroes(validData);
      })
      .catch(err => {
        console.error('❌ Erreur API :', err);
        setHeroes([]);
        setFilteredHeroes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (searchTerm: string, universe: string) => {
    const filtered = heroes.filter(hero => {
      const name = hero.name?.toLowerCase() ?? '';
      const alias = typeof hero.alias === 'string' ? hero.alias.toLowerCase() : '';
      const publisher = hero.biography?.publisher?.toLowerCase() ?? '';
      const search = searchTerm.toLowerCase();
      const universeFilter = universe.toLowerCase();

      const matchesName = name.includes(search) || alias.includes(search);
      const matchesUniverse = universe === '' || publisher === universeFilter;

      return matchesName && matchesUniverse;
    });

    setFilteredHeroes(filtered);
    setVisibleCount(50); // reset pagination on search
  };

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 50);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Liste des héros</h2>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p>Chargement des héros...</p>
      ) : filteredHeroes.length > 0 ? (
        <>
          <div className="hero-grid">
            {filteredHeroes.slice(0, visibleCount).map((hero, index) => (
              <HeroCard key={hero._id ?? hero.id ?? index} hero={hero} />
            ))}
          </div>
          {visibleCount < filteredHeroes.length && (
            <div style={{ marginTop: '1rem' }}>
              <button onClick={handleShowMore}>Voir plus</button>
            </div>
          )}
        </>
      ) : (
        <p>Aucun héros ne correspond à votre recherche.</p>
      )}
    </div>
  );
}
