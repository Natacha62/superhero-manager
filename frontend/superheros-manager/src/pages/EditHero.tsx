import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHeroById, updateHero } from '../api/heroApi';
import HeroForm from '../components/HeroForm';
import type { SuperHero } from '../types/Hero';
import { useAuth } from '../hooks/useAuth';

export default function EditHero() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [hero, setHero] = useState<SuperHero | null>(null);

  useEffect(() => {
    if (id) {
      getHeroById(Number(id)).then(setHero);
    }
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    if (!id || !token) return;
    await updateHero(Number(id), formData, token);
    navigate('/');
  };

  if (!hero) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Modifier le héros</h2>
      <HeroForm initialData={hero} onSubmit={handleUpdate} submitLabel="Modifier le héros" />
    </div>
  );
}
