const express = require('express');
const router = express.Router();

// include CLOUDINARY:
const uploader = require('../config/cloudinary.config');

router.post('/upload', uploader.single('imageUrl'), (req, res, next) => {
  //console.log('file is: ', req.file);

  if (!req.file) {
    next(new Error('No file uploaded!'));
    res.status(400).json({ message: 'No file uploaded!' });
  }
  // get the URL of the uploaded file and send it as a response.
  // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend

  const { file } = req;
  res.status(200).json(file);
});

module.exports = router;
