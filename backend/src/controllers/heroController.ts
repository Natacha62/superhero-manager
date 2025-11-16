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
    const { id, name, slug, powerstats, appearance, biography, work, connections } = req.body;

    const imagePath = req.file ? `uploads/images/md/${req.file.filename}` : '';

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
    console.error('Erreur createHero:', error);
    res.status(500).json({ message: 'Erreur lors de la création du héros' });
  }
};

export const updateHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });

    const { name, slug, powerstats, appearance, biography, work, connections } = req.body;

    if (req.file) {
      if (hero.images?.md) {
        try {
          const absolutePath = path.resolve(hero.images.md);
          if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
          }
        } catch (err) {
          console.warn('Impossible de supprimer l’ancienne image:', err);
        }
      }

      const imagePath = `uploads/images/md/${req.file.filename}`;
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
    console.error('Erreur updateHero:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du héros' });
  }
};

export const deleteHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });

    if (hero.images?.md) {
      try {
        const absolutePath = path.resolve(hero.images.md);
        if (fs.existsSync(absolutePath)) {
          fs.unlinkSync(absolutePath);
        }
      } catch (err) {
        console.warn('Impossible de supprimer l’image:', err);
      }
    }

    await Hero.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Héros supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteHero:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du héros' });
  }
};
