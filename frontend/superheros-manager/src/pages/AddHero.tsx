import { useState } from 'react';

interface HeroFormProps {
  onSubmit: (formData: FormData) => void;
  submitLabel?: string;
}

export default function HeroForm({ onSubmit, submitLabel = 'Enregistrer' }: HeroFormProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [fullName, setFullName] = useState('');
  const [powerstats, setPowerstats] = useState({
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
  });
  const [appearance, setAppearance] = useState({
    gender: '',
    race: '',
    height: [''],
    weight: [''],
    eyeColor: '',
    hairColor: '',
  });
  const [biography, setBiography] = useState({
    alterEgos: '',
    aliases: [''],
    placeOfBirth: '',
    firstAppearance: '',
    publisher: '',
    alignment: '',
  });
  const [work, setWork] = useState({ occupation: '', base: '' });
  const [connections, setConnections] = useState({ groupAffiliation: '', relatives: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('biography.fullName', fullName);

    Object.entries(powerstats).forEach(([key, value]) =>
      formData.append(`powerstats.${key}`, value.toString())
    );

    Object.entries(appearance).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v, i) => formData.append(`appearance.${key}[${i}]`, v));
      } else {
        formData.append(`appearance.${key}`, value);
      }
    });

    Object.entries(biography).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v, i) => formData.append(`biography.${key}[${i}]`, v));
      } else {
        formData.append(`biography.${key}`, value);
      }
    });

    Object.entries(work).forEach(([key, value]) =>
      formData.append(`work.${key}`, value)
    );

    Object.entries(connections).forEach(([key, value]) =>
      formData.append(`connections.${key}`, value)
    );

    if (imageFile) {
      formData.append('image', imageFile);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="hero-form">
      <h3>Identité</h3>
      <input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
      <input placeholder="Nom complet" value={fullName} onChange={(e) => setFullName(e.target.value)} required />

      <h3>Statistiques</h3>
      {Object.entries(powerstats).map(([key, value]) => (
        <input
          key={key}
          type="number"
          placeholder={key}
          value={value}
          onChange={(e) =>
            setPowerstats({ ...powerstats, [key]: parseInt(e.target.value) })
          }
        />
      ))}

      <h3>Apparence</h3>
      <input placeholder="Genre" value={appearance.gender} onChange={(e) => setAppearance({ ...appearance, gender: e.target.value })} />
      <input placeholder="Race" value={appearance.race} onChange={(e) => setAppearance({ ...appearance, race: e.target.value })} />
      <input placeholder="Taille (cm)" value={appearance.height[0]} onChange={(e) => setAppearance({ ...appearance, height: [e.target.value] })} />
      <input placeholder="Poids (kg)" value={appearance.weight[0]} onChange={(e) => setAppearance({ ...appearance, weight: [e.target.value] })} />
      <input placeholder="Yeux" value={appearance.eyeColor} onChange={(e) => setAppearance({ ...appearance, eyeColor: e.target.value })} />
      <input placeholder="Cheveux" value={appearance.hairColor} onChange={(e) => setAppearance({ ...appearance, hairColor: e.target.value })} />

      <h3>Biographie</h3>
      <input placeholder="Alter egos" value={biography.alterEgos} onChange={(e) => setBiography({ ...biography, alterEgos: e.target.value })} />
      <input placeholder="Alias" value={biography.aliases[0]} onChange={(e) => setBiography({ ...biography, aliases: [e.target.value] })} />
      <input placeholder="Lieu de naissance" value={biography.placeOfBirth} onChange={(e) => setBiography({ ...biography, placeOfBirth: e.target.value })} />
      <input placeholder="Première apparition" value={biography.firstAppearance} onChange={(e) => setBiography({ ...biography, firstAppearance: e.target.value })} />
      <input placeholder="Éditeur" value={biography.publisher} onChange={(e) => setBiography({ ...biography, publisher: e.target.value })} />
      <input placeholder="Alignement" value={biography.alignment} onChange={(e) => setBiography({ ...biography, alignment: e.target.value })} />

      <h3>Travail</h3>
      <input placeholder="Occupation" value={work.occupation} onChange={(e) => setWork({ ...work, occupation: e.target.value })} />
      <input placeholder="Base" value={work.base} onChange={(e) => setWork({ ...work, base: e.target.value })} />

      <h3>Relations</h3>
      <input placeholder="Groupes" value={connections.groupAffiliation} onChange={(e) => setConnections({ ...connections, groupAffiliation: e.target.value })} />
      <input placeholder="Famille" value={connections.relatives} onChange={(e) => setConnections({ ...connections, relatives: e.target.value })} />

      <h3>Image</h3>
      <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />

      <button type="submit">{submitLabel}</button>
    </form>
  );
}
