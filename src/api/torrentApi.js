import axios from 'axios';


const BASE_URL = 'https://torhopper-backend.vercel.app/api/';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const searchTorrents = async ({ site, query, page = 1 }) => {
  console.log('searchTorrents fired')
  const { data } = await api.get(`/${site}/${query}/${page}`);

  const returnData = data.reduce((acc, curr) => {
    return acc.concat(curr);
  }, []);

  console.log(returnData)
  return returnData;
};



export const searchAllSites = async ({ query, page = 1 }) => {

  console.log('searchALLsites fired')

  const { data } = await api.get(`/all/${query}/${page}`);
  console.log("data from SearchAllSites", data);

  const returnData = data
    .reduce((acc, obj) => {
      const values = Object.values(obj).flat();
      return acc.concat(values);
    }, []).sort((a, b) => b.seeders - a.seeders);

  console.log("returnData from SearchAllSites", returnData);
  return returnData;
};




