const router = require('express').Router();
const Address = require('../models/Address');

const { loginCheck } = require('./middlewares');


/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.get('/user', loginCheck(), (req, res, next) => {
console.log("address GET");
  Address.find({user: req.user._id})
    .then((address) => res.status(200).json(address))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/user/:userid', loginCheck(), (req, res, next) => {
  Address.find({user: req.params.userid})
    .populate('user', ['name', 'email'])
    .then((address) => res.status(200).json(address))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});
/* ***** SPECIAL to this router - actions on the logged user * no id required */


router.post('/', loginCheck(), (req, res, next) => {
  const { user,showoffline,note,promo,street,suite,city,zipcode,phone,website,skype,whatsapp,twitter } = req.body;
  Address.create({user: req.user,showoffline,note,promo,street,suite,city,zipcode,phone,website,skype,whatsapp,twitter })
    .then((address) => res.status(201).json(address))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/', loginCheck(), (req, res, next) => {
  Address.find()
    .then((address) => res.status(200).json(address))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/:id', loginCheck(), (req, res, next) => {
  Address.findById(req.params.id).then((address) => {
    if (!address) {
      return res.status(400).json(address);
    } else {
      return res.status(200).json(address);
    }
  })
      .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.put('/:id', loginCheck(), (req, res, next) => {
  const { showoffline,note,promo,street,suite,city,zipcode,phone,website,skype,whatsapp,twitter } = req.body;
console.log("address PUT",street);
  Address.findOneAndUpdate(
    {_id: req.params.id, user: req.user},
    { showoffline,note,promo,street,suite,city,zipcode,phone,website,skype,whatsapp,twitter },
    { new: true }
  )
    .then((address) => res.status(201).json(address))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.patch('/:id', loginCheck(), (req, res, next) => {
console.log("address patch");
	// to update only one item in 
  const { what,newvalue } = req.body;
  Address.findOneAndUpdate(
    {_id: req.params.id, user: req.user},
    {[what]: newvalue},
    { new: true }
  )
    .then((address) => res.status(201).json(address))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.delete('/:id', loginCheck(), (req, res) => {
  Address.findOneAndDelete({_id: req.params.id, user: req.user})
    .then(() => res.status(200).json({ message: 'address deleted' }))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});


module.exports = router;
