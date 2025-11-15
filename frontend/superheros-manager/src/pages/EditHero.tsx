import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHeroById, updateHero } from '../api/heroApi';
import HeroForm from '../components/HeroForm';
import type { SuperHero } from '../types/Hero';
import { useAuth } from '../hooks/useAuth';

export default function EditHero() {
  // id est une chaîne (string) grâce au typage
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [hero, setHero] = useState<SuperHero | null>(null);

  useEffect(() => {
    if (id) {
      // on passe directement id (string) à l’API
      getHeroById(id).then(setHero).catch(() => {
        setHero(null);
      });
    }
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    if (!id || !token) return;
    // idem, id reste une chaîne
    await updateHero(id, formData, token);
    navigate('/');
  };

  if (!id) return <p>Identifiant invalide.</p>;
  if (!hero) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Modifier le héros</h2>
      <HeroForm
        initialData={hero}
        onSubmit={handleUpdate}
        submitLabel="Modifier le héros"
      />
    </div>
  );
}
