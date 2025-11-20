// src/api/heroApi.ts
import axios from 'axios';
import type { SuperHero } from '../types/Hero';

const API_BASE_URL = '/api/heroes';

interface SuperHeroResponse {
  superheros: SuperHero[];
}

export const getSuperHeroes = async (): Promise<SuperHeroResponse> => {
  try {
    const res = await axios.get(API_BASE_URL);
    return res.data; // { superheros: [...] }
  } catch (error) {
    console.error('❌ Erreur API getSuperHeroes:', error);
    return { superheros: [] };
  }
};

export const getHeroById = async (id: string): Promise<SuperHero> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/${id}`);
    return res.data.hero;
  } catch (error) {
    console.error('❌ Erreur API getHeroById:', error);
    throw error;
  }
};

export const createHero = async (hero: FormData, token: string): Promise<SuperHero> => {
  try {
    const res = await axios.post(API_BASE_URL, hero, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  } catch (error) {
    console.error('❌ Erreur API createHero:', error);
    throw error;
  }
};

export const updateHero = async (id: string, hero: FormData, token: string): Promise<SuperHero> => {
  try {
    const res = await axios.put(`${API_BASE_URL}/${id}`, hero, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  } catch (error) {
    console.error('❌ Erreur API updateHero:', error);
    throw error;
  }
};

export const deleteHero = async (id: string, token: string): Promise<{ message: string }> => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error('❌ Erreur API deleteHero:', error);
    throw error;
  }
};
