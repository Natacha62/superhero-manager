import { useNavigate } from 'react-router-dom';
import HeroForm from '../components/HeroForm';
import { createHero } from '../api/heroApi';
import { useAuth } from '../hooks/useAuth';

export default function AddHero() {
  const navigate = useNavigate();
  const { token} = useAuth();

  const handleCreate = async (formData: FormData) => {
    if (!token) {
      alert('Vous devez être connecté pour ajouter un héros.');
      return;
    }

    try {
      const newHero = await createHero(formData, token);
      console.log('Héros créé avec succès :', newHero);

      // Redirection vers la page du héros
      navigate(`/hero/${newHero._id ?? newHero.id}`);
    } catch (error) {
      console.error('Erreur lors de la création du héros :', error);
      alert('Échec de la création du héros. Vérifiez les champs et réessayez.');
    }
  };

  return (
    <div className="page-add-hero">
      <h1>Ajouter un nouveau héros</h1>
      <HeroForm onSubmit={handleCreate} submitLabel="Enregistrer" />
    </div>
  );
}
