import axios from 'axios';

const API_URL = 'https://apigp.onrender.com';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { username, password });
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};