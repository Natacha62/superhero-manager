import { useState, useEffect } from 'react';
import './styles/app.css';
import type { SuperHero } from '../types/Hero';


interface HeroFormProps {
  initialData?: SuperHero;
  onSubmit: (formData: FormData) => void;
  submitLabel?: string;
}


export default function HeroForm({
  initialData,
  onSubmit,
  submitLabel = 'Enregistrer',
}: HeroFormProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [power, setPower] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
  if (initialData) {
    setName(initialData.name);
    setSlug(initialData.slug);
    setPower(initialData.powerstats.power.toString());
    setDescription(initialData.biography.fullName); // ou autre champ pertinent
  }
}, [initialData]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('power', power);
    formData.append('description', description);
    onSubmit(formData);
  };

  return (
    <form className="hero-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom du héros"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Slug (ex: 1-a-bomb)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Pouvoir"
        value={power}
        onChange={(e) => setPower(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />

      <button type="submit">{submitLabel}</button>
    </form>
  );
}
