import axios from 'axios';
import qs from 'qs';

const api = axios.create({
  baseURL: process.env.REACT_APP_API || '/api',
});

export const insert = (base, payload) => api.post(`/${base}`, payload);
export const modifyById = (base, id, payload) =>
  api.put(`/${base}/${id}`, payload);
export const updateById = (base, id, payload) =>
  api.put(`/${base}/${id}`, payload);
export const deleteById = (base, id) => api.delete(`/${base}/${id}`);

export const getAlls = (base) => api.get(`/${base}`);
export const getById = (base, id) => api.get(`/${base}/${id}`);

export const modifyUser = (payload) => api.put('/user/', payload);
export const getUser = () => api.get('/user/user/');

export const getUserAddresses = () => api.get('/address/user/');
export const getEventForAddress = (id) => api.get(`/event/address/${id}`);
export const searchAddresses = (options) => {
  const URL = '/address/business';
  const optionStr = qs.stringify(options);
  const fullURL = URL + (options ? ['?', optionStr].join('') : '');
  return api.get(fullURL);
};

const apis = {
  insert,
  modifyById,
  updateById,
  deleteById,
  getAlls,
  getById,
  modifyUser,
  getUser,
  getUserAddresses,
  getEventForAddress,
  searchAddresses,
};

export default apis;
