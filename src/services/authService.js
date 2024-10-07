import axios from 'axios';

const API_URL = 'http://51.75.95.225:3000';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { username, password });
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};