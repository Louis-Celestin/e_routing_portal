import axios from 'axios';

const API_URL = 'http://172.31.1.27:5500/api';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};