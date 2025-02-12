import axios from 'axios';

const BASE_URL = 'https://torhopper-backend.vercel.app/api/';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const searchTorrent = async ({ query, page = 1, site = "1337x" }) => {
  console.log(`Querying ${site} for ${query} on page ${page}`);
  try {
    const response = await api.get(`/${site}/${query}/${page}`);
    const data = response.data;

    console.log(`Response from api:`, data);

    if (data.error) {
      console.error("Error in searchTorrent:", data.error);
      return { error: data.error };
    }

    return  Object.values(data)[0] || [];
  } catch (err) {
    console.error('Error in searchTorrent:', err);
    throw new Error(err);
  }
};
