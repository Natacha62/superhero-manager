import { useEffect, useState } from 'react';
import { getSuperHeroes, deleteHero } from '../api/heroApi';
import HeroCard from '../components/HeroCard';
import SearchBar from '../components/SearchBar';
import type { SuperHero } from '../types/Hero';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const [heroes, setHeroes] = useState<SuperHero[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<SuperHero[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(50);
  const [sortOption, setSortOption] = useState<string>(''); // ✅ nouvelle state

  const { token } = useAuth();

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

  // ✅ Suppression d'un héros
  const handleDelete = async (id: string) => {
    if (!token) {
      alert('Vous devez être connecté pour supprimer un héros.');
      return;
    }
    try {
      await deleteHero(id, token);
      // Mettre à jour la liste locale
      setHeroes(prev => prev.filter(h => (h._id ?? h.id) !== id));
      setFilteredHeroes(prev => prev.filter(h => (h._id ?? h.id) !== id));
      alert('Héros supprimé avec succès');
    } catch (err) {
      console.error('❌ Erreur suppression :', err);
      alert('Échec de la suppression');
    }
  };

  // ✅ Tri
  const handleSort = (option: string) => {
    setSortOption(option);
    let sorted = [...filteredHeroes];

    if (option === 'alpha') {
      sorted.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
    } else if (option === 'date') {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt ?? '').getTime() -
          new Date(a.createdAt ?? '').getTime()
      );
    }

    setFilteredHeroes(sorted);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Liste des superhéros</h2>
      <SearchBar onSearch={handleSearch} />

      {/* ✅ Menu de tri */}
      <div className="sort-bar">
        <label htmlFor="sort">Trier par :</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">-- Aucun --</option>
          <option value="alpha">Ordre alphabétique</option>
          <option value="date">Date d’ajout</option>
        </select>
      </div>

      {loading ? (
        <p>Chargement des héros...</p>
      ) : filteredHeroes.length > 0 ? (
        <>
          <div className="hero-grid">
            {filteredHeroes.slice(0, visibleCount).map((hero, index) => (
              <HeroCard
                key={hero._id ?? hero.id ?? index}
                hero={hero}
                onDelete={handleDelete}
              />
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
