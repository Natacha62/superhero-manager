import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string, universe: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [universe, setUniverse] = useState<string>(''); //  nouvel état

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, universe); //  transmettre les deux
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="row g-3 align-items-center">
        <div className="col-md">
          <input
            type="text"
            placeholder="Rechercher par nom ou alias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md">
          <select
            value={universe}
            onChange={(e) => setUniverse(e.target.value)}
            className="form-select"
          >
            <option value="">Tous les univers</option>
            <option value="Marvel Comics">Marvel Comics</option>
            <option value="DC Comics">DC Comics</option>
            <option value="Dark Horse Comics">Dark Horse Comics</option>
            <option value="Image Comics">Image Comics</option>
            {/* Ajoute d'autres éditeurs si nécessaire */}
          </select>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">
            Rechercher
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;