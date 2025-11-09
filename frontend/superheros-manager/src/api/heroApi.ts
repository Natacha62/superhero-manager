import axios from 'axios';
import type { SuperHero } from '../types/Hero';

const API_BASE_URL = 'http://localhost:5000';

// 🔓 Lecture publique
export const getSuperHeroes = async (): Promise<SuperHero[]> => {
  const res = await axios.get(`${API_BASE_URL}/api/heroes`);
  return res.data.superheros;
};

export const getHeroById = async (id: number): Promise<SuperHero> => {
  const res = await axios.get(`${API_BASE_URL}/api/heroes/${id}`);
  return res.data;
};

// 🔐 Création (admin + editor)
export const createHero = async (hero: FormData, token: string): Promise<SuperHero> => {
  const res = await axios.post(`${API_BASE_URL}/api/heroes`, hero, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

// 🔐 Modification (admin + editor)
export const updateHero = async (id: number, hero: FormData, token: string): Promise<SuperHero> => {
  const res = await axios.put(`${API_BASE_URL}/api/heroes/${id}`, hero, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

// 🔐 Suppression (admin uniquement)
export const deleteHero = async (id: number, token: string): Promise<{ message: string }> => {
  const res = await axios.delete(`${API_BASE_URL}/api/heroes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
