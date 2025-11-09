import { useEffect, useState } from 'react';
import { getSuperHeroes } from '../api/heroApi';
import HeroCard from '../components/HeroCard';
import SearchBar from '../components/SearchBar';
import type { SuperHero } from '../types/Hero';
import '../styles/app.css'; 

export default function Dashboard() {
  const [heroes, setHeroes] = useState<SuperHero[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getSuperHeroes().then(setHeroes);
  }, []);

  const filteredHeroes = heroes.filter(hero =>
    hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Liste des héros</h2>
      <div className="search-bar">
        <SearchBar onSearch={setSearchTerm} />
      </div>
      <div className="hero-grid">
        {filteredHeroes.map(hero => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>
    </div>
  );
}
