import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

// 🔐 Connexion
export const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { username, password });
  return res.data;
};

// 🆕 Inscription
export const register = async (
  username: string,
  password: string,
  role: string
): Promise<AuthResponse> => {
  const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
    username,
    password,
    role,
  });
  return res.data;
};

// ✅ Vérification du token
export const verifyToken = async (
  token: string
): Promise<{ user: AuthResponse['user'] }> => {
  const res = await axios.get(`${API_BASE_URL}/api/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
