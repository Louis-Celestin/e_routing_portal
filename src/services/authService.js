import axios from 'axios';

const urlLocal = "http://172.31.1.74:5500"
const urlOnline = "http://51.75.95.225:3000"

const API_URL = urlOnline

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { username, password });
    console.log(response)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};