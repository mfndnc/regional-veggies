const router = require('express').Router();
const AddressType = require('../models/AddressType');

const { loginCheck } = require('./midlware/middlewares');

router.get('/addrtypes', loginCheck(), (req, res, next) => {
  AddressType.find()
    .then((els) => res.status(200).json(els))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/addrtypes/:id', loginCheck(), (req, res, next) => {
  AddressType.findById(req.params.id)
    .then((el) => {
      if (!el) {
        return res.status(400).json(el);
      } else {
        return res.status(200).json(el);
      }
    })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

module.exports = router;
