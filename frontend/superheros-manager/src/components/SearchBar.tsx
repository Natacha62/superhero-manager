import { useState } from 'react';
import '../styles/app.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Rechercher un héros..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
}
