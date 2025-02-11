import axios from 'axios';

const BASE_URL = 'https://torhopper-backend.vercel.app/api/';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const searchTorrent = async ({ query, page = 1, site }) => {

  if (site === 'all') {

    try {
      const { data } = await api.get(`/all/${query}/${page}`);
      const result = data
        .reduce((acc, obj) => acc.concat(Object.values(obj).flat()), [])
        .sort((a, b) => b.seeders - a.seeders);
      return result;
    } catch (error) {
      console.error('Error in searchTorrent:', error);
      return new Error(error);
    }

  }

  // searching on a single site

  if (site !== "all") {
    try {
      const { data } = await api.get(`/${site}/${query}/${page}`);

      // if error is returned
      if (Object.keys(data)[0] === 'error') {
        console.log("Error in searchTorrent: ", Object.values(data)[0]);
       return data;

      } else {
        const result = Object.values(data)[0];
        return result;
      }

    } catch (error) {
      console.error('Error in searchTorrent:', error);
      return new Error(error);
    }



  }

  try {
    if (site) {

      console.log(data);


      if (Object.keys[0] === 'error') {
        console.log("Error in searchTorrent: ", Object.values(data)[0]);
        throw new Error(Object.values(data)[0]);
        return;
      }
      const result = Object.values(data)[0];
      if (result.includes('No Search Result')) {
        return [];
      }
      return result;
    } else {
      const { data } = await api.get(`/all/${query}/${page}`);
      const result = data
        .reduce((acc, obj) => acc.concat(Object.values(obj).flat()), [])
        .sort((a, b) => b.seeders - a.seeders);
      return result;
    }
  } catch (error) {
    console.error('Error in searchTorrent:', error);
    throw error;
  }
};
