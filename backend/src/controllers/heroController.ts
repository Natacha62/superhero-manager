import { Request, Response } from 'express';
import Hero from '../models/Hero';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose'

// ✅ GET tous les héros (avec recherche par nom)
export const getAllHeroes = async (req: Request, res: Response) => {
  try {
    const heroes = await Hero.find(); // ✅ Lecture depuis MongoDB
    res.status(200).json({ superheros: heroes }); // ✅ Format homogène
  } catch (error) {
    console.error('Erreur dans getAllHeroes:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ GET un héros par ID
export const getHeroById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // ✅ Vérifie que l'ID est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const hero = await Hero.findById(id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });

    // ✅ Renvoie un format homogène
    res.status(200).json({ hero });
  } catch (error) {
    console.error('Erreur dans getHeroById:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ POST créer un héros (adapté à ton schéma MongoDB)
export const createHero = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      slug,
      powerstats,
      appearance,
      biography,
      work,
      connections
    } = req.body;

    const imagePath = req.file ? req.file.path : '';

    const newHero = new Hero({
      id,
      name,
      slug,
      powerstats,
      appearance,
      biography,
      work,
      connections,
      images: {
        xs: imagePath,
        sm: imagePath,
        md: imagePath,
        lg: imagePath
      }
    });

    await newHero.save();
    res.status(201).json(newHero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du héros' });
  }
};

// ✅ PUT modifier un héros
export const updateHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });

    const {
      name,
      slug,
      powerstats,
      appearance,
      biography,
      work,
      connections
    } = req.body;

    if (req.file) {
      if (hero.images?.md) fs.unlinkSync(hero.images.md);
      const imagePath = req.file.path;
      hero.images = {
        xs: imagePath,
        sm: imagePath,
        md: imagePath,
        lg: imagePath
      };
    }

    hero.name = name || hero.name;
    hero.slug = slug || hero.slug;
    hero.powerstats = powerstats || hero.powerstats;
    hero.appearance = appearance || hero.appearance;
    hero.biography = biography || hero.biography;
    hero.work = work || hero.work;
    hero.connections = connections || hero.connections;

    await hero.save();
    res.status(200).json(hero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du héros' });
  }
};

// ✅ DELETE supprimer un héros
export const deleteHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });

    if (hero.images?.md) fs.unlinkSync(hero.images.md);
    await Hero.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Héros supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du héros' });
  }
};
