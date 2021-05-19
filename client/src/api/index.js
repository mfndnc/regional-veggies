import axios from 'axios';
import qs from 'qs';

const api = axios.create({
  baseURL: process.env.REACT_APP_API || '/api',
});

export const insert = (base, payload) => api.post(`/${base}`, payload);
export const modifyById = (base, id, payload) =>
  api.put(`/${base}/${id}`, payload);
export const updateById = (base, id, payload) =>
  api.patch(`/${base}/${id}`, payload);
export const deleteById = (base, id) => api.delete(`/${base}/${id}`);

export const getAlls = (base) => api.get(`/${base}`);
export const countAlls = (base) => api.get(`/${base}/count`);

export const getById = (base, id) => api.get(`/${base}/${id}`);

export const modifyUser = (payload) => api.put('/user/', payload);
export const getUser = () => api.get('/user/user/');

export const getUserAddresses = () => api.get('/address/user');
export const countUserAddresses = () => api.get('/address/user/count');

export const getEventForAddress = (id) => api.get(`/event/address/${id}`);
export const countEventForAddress = (id) =>
  api.get(`/event/address/${id}/count`);

export const searchAddresses = (options) => {
  const URL = '/address/business';
  const optionStr = qs.stringify(options);
  const fullURL = URL + (options ? ['?', optionStr].join('') : '');
  return api.get(fullURL);
};

export const findDelete = (base, options) => {
  const optionStr = qs.stringify(options);
  const fullURL = '/' + base + (options ? ['?', optionStr].join('') : '');
  console.log(base, options, fullURL);
  return api.delete(fullURL);
};

const apis = {
  insert,
  modifyById,
  updateById,
  deleteById,
  getAlls,
  countAlls,
  getById,
  modifyUser,
  getUser,
  getUserAddresses,
  countUserAddresses,
  getEventForAddress,
  countEventForAddress,
  searchAddresses,
  findDelete,
};

export default apis;
