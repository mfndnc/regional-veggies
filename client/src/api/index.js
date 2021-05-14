import axios from 'axios';

const jsonplaceholder = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: process.env.REACT_APP_API || jsonplaceholder || '/api',
});

export const insert = (base, payload) => api.post(`/${base}`, payload);
export const modifyById = (base, id, payload) =>
  api.put(`/${base}/${id}`, payload);
export const updateById = (base, id, payload) =>
  api.put(`/${base}/${id}`, payload);
export const deleteById = (base, id) => api.delete(`/${base}/${id}`);

export const getAlls = (base) => api.get(`/${base}`);
export const getById = (base, id) => api.get(`/${base}/${id}`);

const apis = {
  insert,
  modifyById,
  updateById,
  deleteById,
  getAlls,
  getById,
};

export default apis;
