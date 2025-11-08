import { Request, Response } from 'express';
import Hero from '../models/Hero';
import fs from 'fs';
import path from 'path';

// ✅ GET tous les héros
export const getHeroes = async (req: Request, res: Response) => {
  const { search, universe, sort } = req.query;

  try {
    let query: any = {};

    if (search) {
      query.$or = [
        { nom: { $regex: search, $options: 'i' } },
        { alias: { $regex: search, $options: 'i' } }
      ];
    }

    if (universe) {
      query.univers = universe;
    }

    let heroes = await Hero.find(query);

    if (sort === 'alpha') {
      heroes = heroes.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (sort === 'date') {
      heroes = heroes.reverse(); // suppose que le dernier ajouté est en bas
    }

    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ GET un héros par ID
export const getHeroById = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ✅ POST créer un héros
export const createHero = async (req: Request, res: Response) => {
  try {
    const {
      nom,
      alias,
      univers,
      pouvoirs,
      description,
      origine,
      premiereApparition
    } = req.body;

    const imagePath = req.file ? req.file.path : '';

    const newHero = new Hero({
      nom,
      alias,
      univers,
      pouvoirs: JSON.parse(pouvoirs),
      description,
      origine,
      premiereApparition,
      image: imagePath
    });

    await newHero.save();
    res.status(201).json(newHero);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du héros' });
  }
};

// ✅ PUT modifier un héros
export const updateHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });

    const {
      nom,
      alias,
      univers,
      pouvoirs,
      description,
      origine,
      premiereApparition
    } = req.body;

    if (req.file) {
      if (hero.image) fs.unlinkSync(hero.image);
      hero.image = req.file.path;
    }

    hero.nom = nom || hero.nom;
    hero.alias = alias || hero.alias;
    hero.univers = univers || hero.univers;
    hero.pouvoirs = pouvoirs ? JSON.parse(pouvoirs) : hero.pouvoirs;
    hero.description = description || hero.description;
    hero.origine = origine || hero.origine;
    hero.premiereApparition = premiereApparition || hero.premiereApparition;

    await hero.save();
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du héros' });
  }
};

// ✅ DELETE supprimer un héros
export const deleteHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });

    if (hero.image) fs.unlinkSync(hero.image);
    await Hero.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Héros supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du héros' });
  }
};
