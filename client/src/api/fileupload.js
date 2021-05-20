// api/service.js

import axios from 'axios';

const service = axios.create({
  baseURL: process.env.REACT_APP_API || '/api',
});

const errorHandler = (err) => {
  console.error(err);
  throw err;
};

const objtoexport = {
  service,

  handleUpload(theFile) {
    //console.log('file in service: ', theFile);
    return service
      .post('/file/upload', theFile)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  saveNewThing(newThing) {
    //console.log('new thing is: ', newThing);
    return service
      .post('/file/things/create', newThing)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};

export default objtoexport;
