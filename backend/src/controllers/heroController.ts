import { Request, Response } from 'express';
import Hero from '../models/Hero';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

export const getAllHeroes = async (req: Request, res: Response) => {
  try {
    const heroes = await Hero.find();
    res.status(200).json({ superheros: heroes });
  } catch (error) {
    console.error('Erreur dans getAllHeroes:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getHeroById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const hero = await Hero.findById(id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });

    res.status(200).json({ hero });
  } catch (error) {
    console.error('Erreur dans getHeroById:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const createHero = async (req: Request, res: Response) => {
  try {
    const lastHero = await Hero.findOne().sort({ id: -1 });
    const nextId = lastHero ? lastHero.id + 1 : 1;

    // ✅ Chemin relatif vers image dans "new"
    const imagePath = req.file ? `new/${req.file.filename}` : '';

    const newHero = new Hero({
      id: nextId,
      name: req.body.name,
      slug: req.body.slug,
      powerstats: {
        intelligence: Number(req.body['powerstats.intelligence'] ?? 0),
        strength: Number(req.body['powerstats.strength'] ?? 0),
        speed: Number(req.body['powerstats.speed'] ?? 0),
        durability: Number(req.body['powerstats.durability'] ?? 0),
        power: Number(req.body['powerstats.power'] ?? 0),
        combat: Number(req.body['powerstats.combat'] ?? 0),
      },
      appearance: {
        gender: req.body['appearance.gender'] ?? '',
        race: req.body['appearance.race'] ?? null,
        height: [req.body['appearance.height[0]'] ?? ''],
        weight: [req.body['appearance.weight[0]'] ?? ''],
        eyeColor: req.body['appearance.eyeColor'] ?? '',
        hairColor: req.body['appearance.hairColor'] ?? '',
      },
      biography: {
        fullName: req.body['biography.fullName'] ?? '',
        alterEgos: req.body['biography.alterEgos'] ?? '',
        aliases: [req.body['biography.aliases[0]'] ?? ''],
        placeOfBirth: req.body['biography.placeOfBirth'] ?? '',
        firstAppearance: req.body['biography.firstAppearance'] ?? '',
        publisher: req.body['biography.publisher'] ?? '',
        alignment: req.body['biography.alignment'] ?? '',
      },
      work: {
        occupation: req.body['work.occupation'] ?? '',
        base: req.body['work.base'] ?? '',
      },
      connections: {
        groupAffiliation: req.body['connections.groupAffiliation'] ?? '',
        relatives: req.body['connections.relatives'] ?? '',
      },
      images: {
        xs: imagePath,
        sm: imagePath,
        md: imagePath,
        lg: imagePath,
      },
    });

    await newHero.save();
    res.status(201).json(newHero);
  } catch (error) {
    console.error('Erreur createHero:', error);
    res.status(500).json({ message: 'Erreur lors de la création du héros' });
  }
};

export const updateHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });

    const { name, slug } = req.body;

    // Mise à jour de l'image : supprimer l'ancienne, enregistrer la nouvelle
    if (req.file) {
      if (hero.images?.md && !hero.images.md.includes('default.jpg')) {
        try {
          const absolutePath = path.join(process.cwd(), 'uploads', 'images', hero.images.md);
          if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
            console.log(`Ancienne image supprimée : ${absolutePath}`);
          }
        } catch (err) {
          console.warn('Impossible de supprimer l’ancienne image:', err);
        }
      }

      // ✅ Correction : enregistrer dans "new/"
      const imagePath = `new/${req.file.filename}`;
      hero.images = {
        xs: imagePath,
        sm: imagePath,
        md: imagePath,
        lg: imagePath,
      };
    }

    // Mettre à jour les champs si fournis
    hero.name = name ?? hero.name;
    hero.slug = slug ?? hero.slug;

    // Powerstats
    const maybePower = {
      intelligence: req.body['powerstats.intelligence'],
      strength: req.body['powerstats.strength'],
      speed: req.body['powerstats.speed'],
      durability: req.body['powerstats.durability'],
      power: req.body['powerstats.power'],
      combat: req.body['powerstats.combat'],
    };
    if (Object.values(maybePower).some(v => v !== undefined)) {
      hero.powerstats = {
        intelligence: Number(maybePower.intelligence ?? hero.powerstats.intelligence),
        strength: Number(maybePower.strength ?? hero.powerstats.strength),
        speed: Number(maybePower.speed ?? hero.powerstats.speed),
        durability: Number(maybePower.durability ?? hero.powerstats.durability),
        power: Number(maybePower.power ?? hero.powerstats.power),
        combat: Number(maybePower.combat ?? hero.powerstats.combat),
      };
    }

    // Appearance
    const maybeAppearance = {
      gender: req.body['appearance.gender'],
      race: req.body['appearance.race'],
      height0: req.body['appearance.height[0]'],
      weight0: req.body['appearance.weight[0]'],
      eyeColor: req.body['appearance.eyeColor'],
      hairColor: req.body['appearance.hairColor'],
    };
    if (Object.values(maybeAppearance).some(v => v !== undefined)) {
      hero.appearance = {
        gender: (maybeAppearance.gender ?? hero.appearance.gender) as string,
        race: (maybeAppearance.race ?? hero.appearance.race) as string | null,
        height: [maybeAppearance.height0 ?? hero.appearance.height?.[0] ?? ''],
        weight: [maybeAppearance.weight0 ?? hero.appearance.weight?.[0] ?? ''],
        eyeColor: (maybeAppearance.eyeColor ?? hero.appearance.eyeColor) as string,
        hairColor: (maybeAppearance.hairColor ?? hero.appearance.hairColor) as string,
      };
    }

    // Biography
    const maybeBio = {
      fullName: req.body['biography.fullName'],
      alterEgos: req.body['biography.alterEgos'],
      aliases0: req.body['biography.aliases[0]'],
      placeOfBirth: req.body['biography.placeOfBirth'],
      firstAppearance: req.body['biography.firstAppearance'],
      publisher: req.body['biography.publisher'],
      alignment: req.body['biography.alignment'],
    };
    if (Object.values(maybeBio).some(v => v !== undefined)) {
      hero.biography = {
        fullName: (maybeBio.fullName ?? hero.biography.fullName) as string,
        alterEgos: (maybeBio.alterEgos ?? hero.biography.alterEgos) as string,
        aliases: [maybeBio.aliases0 ?? hero.biography.aliases?.[0] ?? ''],
        placeOfBirth: (maybeBio.placeOfBirth ?? hero.biography.placeOfBirth) as string,
        firstAppearance: (maybeBio.firstAppearance ?? hero.biography.firstAppearance) as string,
        publisher: (maybeBio.publisher ?? hero.biography.publisher) as string,
        alignment: (maybeBio.alignment ?? hero.biography.alignment) as string,
      };
    }

    // Work
    const maybeWork = {
      occupation: req.body['work.occupation'],
      base: req.body['work.base'],
    };
    if (Object.values(maybeWork).some(v => v !== undefined)) {
      hero.work = {
        occupation: (maybeWork.occupation ?? hero.work.occupation) as string,
        base: (maybeWork.base ?? hero.work.base) as string,
      };
    }

    // Connections
    const maybeConn = {
      groupAffiliation: req.body['connections.groupAffiliation'],
      relatives: req.body['connections.relatives'],
    };
    if (Object.values(maybeConn).some(v => v !== undefined)) {
      hero.connections = {
        groupAffiliation: (maybeConn.groupAffiliation ?? hero.connections.groupAffiliation) as string,
        relatives: (maybeConn.relatives ?? hero.connections.relatives) as string,
      };
    }

    await hero.save();
    res.status(200).json(hero);
  } catch (error) {
    console.error('Erreur updateHero:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du héros' });
  }
};


export const deleteHero = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    // 🔎 Récupérer et supprimer en une seule opération
    const hero = await Hero.findByIdAndDelete(id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });

    // ✅ Supprimer l’image si ce n’est pas une image par défaut
    if (hero.images?.md && !hero.images.md.includes('default.jpg')) {
      try {
        const absolutePath = path.join(process.cwd(), 'uploads', 'images', hero.images.md);
        if (fs.existsSync(absolutePath)) {
          fs.unlinkSync(absolutePath);
          console.log(`Image supprimée : ${absolutePath}`);
        }
      } catch (err) {
        console.warn('Impossible de supprimer l’image:', err);
      }
    }

    res.status(200).json({ message: 'Héros supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteHero:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du héros' });
  }
};
