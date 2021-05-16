require('dotenv').config();

const axios = require('axios');
const qs = require('qs');
const key = process.env.GOOGLEKEY;

const gGeoCode = async (address) => {
  const URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  const options = { address, key };
  const optionStr = qs.stringify(options);
  const fullURL = URL + (options ? ['?', optionStr].join('') : '');
  return axios.get(fullURL);
};

module.exports = {
  gGeoCode,
};
