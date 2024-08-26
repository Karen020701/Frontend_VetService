import axios from 'axios';

const API_URL = 'http://localhost:3022/api';

export const createSuggestion = async (suggestion) => {
  try {
    const response = await axios.post(`${API_URL}/suggestions`, { suggestion });
    return response.data;
  } catch (error) {
    console.error('Error creating suggestion:', error);
    throw error;
  }
};

export const getSuggestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/suggestions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error;
  }
};
