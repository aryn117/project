import axios from 'axios';


const BASE_URL = 'https://torhopper-backend.vercel.app/api/';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const searchSingleSite = async ({ site, query, page = 1 }) => {
  console.log('searchSingleSite fired', site, query, page);

  const { data } = await api.get(`/${site}/${query}/${page}`);
  console.log("data from SearchSingleSite", data);
  const returnData = Object.values(data)[0];
  console.log("returnData from SearchSingleSite", returnData);
  if(returnData.includes("No Search Result")) {
    return [];
  }
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




