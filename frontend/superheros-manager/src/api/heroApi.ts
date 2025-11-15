import axios from 'axios';
import type { SuperHero } from '../types/Hero';

// ✅ Si le proxy est bien configuré, pas besoin d'URL complète
const API_BASE_URL = '/api/heroes';

// ✅ Type de réponse attendu par l'API
interface SuperHeroResponse {
  superheros: SuperHero[];
}

// 🔓 Lecture publique
export const getSuperHeroes = async (): Promise<SuperHeroResponse> => {
  try {
    const res = await axios.get(API_BASE_URL);
    console.log('✅ Données reçues :', res.data);
    return res.data; // res.data est { superheros: [...] }
  } catch (error) {
    console.error('❌ Erreur API :', error);
    return { superheros: [] };
  }
};


export const getHeroById = async (id: string): Promise<SuperHero> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/${id}`);
    console.log('✅ Données reçues pour getHeroById:', res.data);
    return res.data.hero;
  } catch (error) {
    console.error('❌ Erreur getHeroById :', error);
    throw error;
  }
};

export const createHero = async (hero: FormData, token: string): Promise<SuperHero> => {
  const res = await axios.post(API_BASE_URL, hero, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const updateHero = async (id: string, hero: FormData, token: string): Promise<SuperHero> => {
  const res = await axios.put(`${API_BASE_URL}/${id}`, hero, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const deleteHero = async (id: string, token: string): Promise<{ message: string }> => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
