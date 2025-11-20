import { useState, useEffect } from 'react';
import type { SuperHero } from '../types/Hero';
import '../styles/App.css';

interface HeroFormProps {
  initialData?: SuperHero;
  onSubmit: (formData: FormData) => void;
  submitLabel?: string;
}

export default function HeroForm({ initialData, onSubmit, submitLabel = 'Enregistrer' }: HeroFormProps) {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    intelligence: '',
    strength: '',
    speed: '',
    durability: '',
    power: '',
    combat: '',
    gender: '',
    race: '',
    height: '',
    weight: '',
    eyeColor: '',
    hairColor: '',
    fullName: '',
    alterEgos: '',
    aliases: '',
    placeOfBirth: '',
    firstAppearance: '',
    publisher: '',
    alignment: '',
    occupation: '',
    base: '',
    groupAffiliation: '',
    relatives: ''
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!initialData) return;
    setForm({
      name: initialData.name ?? '',
      slug: initialData.slug ?? '',
      intelligence: initialData.powerstats?.intelligence?.toString() ?? '',
      strength: initialData.powerstats?.strength?.toString() ?? '',
      speed: initialData.powerstats?.speed?.toString() ?? '',
      durability: initialData.powerstats?.durability?.toString() ?? '',
      power: initialData.powerstats?.power?.toString() ?? '',
      combat: initialData.powerstats?.combat?.toString() ?? '',
      gender: initialData.appearance?.gender ?? '',
      race: initialData.appearance?.race ?? '',
      height: initialData.appearance?.height?.join(', ') ?? '',
      weight: initialData.appearance?.weight?.join(', ') ?? '',
      eyeColor: initialData.appearance?.eyeColor ?? '',
      hairColor: initialData.appearance?.hairColor ?? '',
      fullName: initialData.biography?.fullName ?? '',
      alterEgos: initialData.biography?.alterEgos ?? '',
      aliases: initialData.biography?.aliases?.join(', ') ?? '',
      placeOfBirth: initialData.biography?.placeOfBirth ?? '',
      firstAppearance: initialData.biography?.firstAppearance ?? '',
      publisher: initialData.biography?.publisher ?? '',
      alignment: initialData.biography?.alignment ?? '',
      occupation: initialData.work?.occupation ?? '',
      base: initialData.work?.base ?? '',
      groupAffiliation: initialData.connections?.groupAffiliation ?? '',
      relatives: initialData.connections?.relatives ?? ''
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();

    fd.append('name', form.name);
    fd.append('slug', form.slug);

    fd.append('powerstats.intelligence', form.intelligence);
    fd.append('powerstats.strength', form.strength);
    fd.append('powerstats.speed', form.speed);
    fd.append('powerstats.durability', form.durability);
    fd.append('powerstats.power', form.power);
    fd.append('powerstats.combat', form.combat);

    fd.append('appearance.gender', form.gender);
    fd.append('appearance.race', form.race);
    form.height.split(',').forEach((h, i) => fd.append(`appearance.height[${i}]`, h.trim()));
    form.weight.split(',').forEach((w, i) => fd.append(`appearance.weight[${i}]`, w.trim()));
    fd.append('appearance.eyeColor', form.eyeColor);
    fd.append('appearance.hairColor', form.hairColor);

    fd.append('biography.fullName', form.fullName);
    fd.append('biography.alterEgos', form.alterEgos);
    form.aliases.split(',').forEach((a, i) => fd.append(`biography.aliases[${i}]`, a.trim()));
    fd.append('biography.placeOfBirth', form.placeOfBirth);
    fd.append('biography.firstAppearance', form.firstAppearance);
    fd.append('biography.publisher', form.publisher);
    fd.append('biography.alignment', form.alignment);

    fd.append('work.occupation', form.occupation);
    fd.append('work.base', form.base);

    fd.append('connections.groupAffiliation', form.groupAffiliation);
    fd.append('connections.relatives', form.relatives);

    if (file) fd.append('image', file);

    console.log('FormData envoyé:', [...fd.entries()]);
    onSubmit(fd);
  };

  return (
    <form className="hero-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Modifier le héros' : 'Ajouter un héros'}</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" />
      <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" />

      <h3>🧠 Powerstats</h3>
      <input name="intelligence" value={form.intelligence} onChange={handleChange} placeholder="Intelligence" />
      <input name="strength" value={form.strength} onChange={handleChange} placeholder="Force" />
      <input name="speed" value={form.speed} onChange={handleChange} placeholder="Vitesse" />
      <input name="durability" value={form.durability} onChange={handleChange} placeholder="Durabilité" />
      <input name="power" value={form.power} onChange={handleChange} placeholder="Puissance" />
      <input name="combat" value={form.combat} onChange={handleChange} placeholder="Combat" />

      <h3>🧬 Apparence</h3>
      <input name="gender" value={form.gender} onChange={handleChange} placeholder="Genre" />
      <input name="race" value={form.race} onChange={handleChange} placeholder="Race" />
      <input name="height" value={form.height} onChange={handleChange} placeholder="Taille (séparée par ,)" />
      <input name="weight" value={form.weight} onChange={handleChange} placeholder="Poids (séparé par ,)" />
      <input name="eyeColor" value={form.eyeColor} onChange={handleChange} placeholder="Couleur des yeux" />
      <input name="hairColor" value={form.hairColor} onChange={handleChange} placeholder="Couleur des cheveux" />

      <h3>📖 Biographie</h3>
      <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Nom complet" />
      <input name="alterEgos" value={form.alterEgos} onChange={handleChange} placeholder="Alter egos" />
      <input name="aliases" value={form.aliases} onChange={handleChange} placeholder="Alias (séparés par ,)" />
      <input name="placeOfBirth" value={form.placeOfBirth} onChange={handleChange} placeholder="Lieu de naissance" />
      <input name="firstAppearance" value={form.firstAppearance} onChange={handleChange} placeholder="Première apparition" />
      <input name="publisher" value={form.publisher} onChange={handleChange} placeholder="Éditeur" />
      <input name="alignment" value={form.alignment} onChange={handleChange} placeholder="Alignement" />

            <h3>💼 Travail</h3>
      <input name="occupation" value={form.occupation} onChange={handleChange} placeholder="Occupation" />
      <input name="base" value={form.base} onChange={handleChange} placeholder="Base" />

      <h3>👥 Relations</h3>
      <input name="groupAffiliation" value={form.groupAffiliation} onChange={handleChange} placeholder="Groupes" />
      <input name="relatives" value={form.relatives} onChange={handleChange} placeholder="Famille" />

      <h3>🖼️ Image</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <button type="submit">{submitLabel}</button>
    </form>
  );
}
