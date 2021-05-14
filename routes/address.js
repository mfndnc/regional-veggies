const router = require('express').Router();
const Address = require('../models/Address');

const { loginCheck } = require('./middlewares');

router.post('/', loginCheck(), (req, res, next) => {
  const { user,showoffline,note,promo,street,suite,city,zipcode,phone,website,skype,whatsapp,twitter } = req.body;
  Address.create({user: req.user,showoffline,note,promo,street,suite,city,zipcode,phone,website,skype,whatsapp,twitter })
    .then((address) => {
      res.status(201).json(address);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/', loginCheck(), (req, res, next) => {
  Address.find()
    .then((addresss) => {
      res.status(200).json(addresss);
    })
    .catch((err) => res.json(err));
});

router.get('/:id', loginCheck(), (req, res, next) => {
  Address.findById(req.params.id).then((address) => {
    if (!address) {
      res.status(404).json(address);
    } else {
      res.status(200).json(address);
    }
  });
});

router.put('/:id', loginCheck(), (req, res, next) => {
  const { showoffline,note,promo,street,suite,city,zipcode,phone,website,skype,whatsapp,twitter } = req.body;
  Address.findOneAndUpdate(
    {_id: req.params.id, user: req.user},
    { showoffline,note,promo,street,suite,city,zipcode,phone,website,skype,whatsapp,twitter },
    { new: true }
  )
    .then((address) => {
      res.status(200).json(address);
    })
    .catch((err) => res.json(err));
});

router.patch('/:id', loginCheck(), (req, res, next) => {
	// to update only one item in 
  const { what,newvalue } = req.body;
  Address.findOneAndUpdate(
    {_id: req.params.id, user: req.user},
    {[what]: newvalue},
    { new: true }
  )
    .then((address) => {
      res.status(200).json(address);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', loginCheck(), (req, res) => {
  Address.findOneAndDelete({_id: req.params.id, user: req.user}).then(() => {
    res.status(200).json({ message: 'address deleted' });
  });
});

/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.get('/user', loginCheck(), (req, res, next) => {
  Address.find({user: req.user})
    .then((addresss) => {
      res.status(200).json(addresss);
    })
    .catch((err) => res.json(err));
});

router.get('/user/:userid', loginCheck(), (req, res, next) => {
  Address.find({user: req.params.userid})
    .populate('user', ['name', 'email'])
    .then((addresss) => {
      res.status(200).json(addresss);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
