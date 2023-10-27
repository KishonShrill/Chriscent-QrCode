import axios from 'axios';

const ENTITIES_API_URL = 'http://localhost:5000/api/entities'; // Update the URL if needed

export const fetchEntities = async () => {
  try {
    const response = await axios.get(ENTITIES_API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch entities');
  }
};