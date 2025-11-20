import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHeroById, updateHero } from '../api/heroApi';
import HeroForm from '../components/HeroForm';
import type { SuperHero } from '../types/Hero';
import { useAuth } from '../hooks/useAuth';

export default function EditHero() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [hero, setHero] = useState<SuperHero | null>(null);

  // ✅ Vérifie le rôle au montage
  useEffect(() => {
    if (user && user.role !== 'admin' && user.role !== 'editor') {
      navigate('/unauthorized'); // ou retour à la fiche
    }
  }, [user, navigate]);

  useEffect(() => {
    if (id) {
      getHeroById(id).then(setHero).catch(() => setHero(null));
    }
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    if (!id || !token) return;
    try {
      await updateHero(id, formData, token);
      navigate(`/hero/${id}`);
    } catch (err) {
      console.error('Erreur updateHero:', err);
      alert('Impossible de modifier ce héros.');
    }
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