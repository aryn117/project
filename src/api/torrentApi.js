import axios from 'axios';

const BASE_URL = 'https://magnet-server.onrender.com/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const searchTorrents = async ({ site, query, limit = 20, page = 1 }) => {
  const { data } = await api.get('/search', { params: { site, query, limit, page } });
  return data;
};

export const getTrending = async ({ site, limit = 20, category, page = 1 }) => {
  const { data } = await api.get('/trending', { params: { site, limit, category, page } });
  return data;
};

export const getRecent = async ({ site, limit = 20, category, page = 1 }) => {
  const { data } = await api.get('/recent', { params: { site, limit, category, page } });
  return data;
};

export const searchAllSites = async ({ query, limit = 20 }) => {
  const { data } = await api.get('/all/search', { params: { query, limit } });
  return data;
};

export const getAllTrending = async ({ limit = 20 }) => {
  const { data } = await api.get('/all/trending', { params: { limit } });
  return data;
};

export const getAllRecent = async ({ limit = 20 }) => {
  const { data } = await api.get('/all/recent', { params: { limit } });
  return data;
};