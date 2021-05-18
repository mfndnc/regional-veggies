const router = require('express').Router();
const Event = require('../models/Event');

const { loginCheck } = require('./midlware/middlewares');


/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.get('/user', loginCheck(), (req, res, next) => {
  Event.find({user: req.user})
    .then((events) => res.status(200).json(events))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/address/:addrid', loginCheck(), (req, res, next) => {
  console.log('event for address GET', req.params , req.query );
  Event.find({address: req.params.addrid})
    .then((events) => res.status(200).json(events))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.post('/', loginCheck(), (req, res, next) => {
console.log("event POST",req.body);
  const { address,address2,isFromToAddr,showoffline,note,promo,calendar,danteRange } = req.body;
  Event.create({user: req.user,address,address2,isFromToAddr,showoffline,note,promo,calendar,danteRange})
    .then((events) => res.status(201).json(events))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/', loginCheck(), (req, res, next) => {
  Event.find()
    .then((events) => res.status(200).json(events))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/:id', loginCheck(), (req, res, next) => {
  Event.findById(req.params.id).then((event) => {
    if (!event) {
      return res.status(400).json(event);
    } else {
      return res.status(200).json(event);
    }
  })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.put('/:id', loginCheck(), (req, res, next) => {
console.log("event PUT",req.body);
  const { address,address2,isFromToAddr,showoffline,note,promo,calendar,danteRange } = req.body;
  Event.findOneAndUpdate(
    {_id: req.params.id, user: req.user},
    { address,address2,isFromToAddr,showoffline,note,promo,calendar,danteRange },
    { new: true }
  )
    .then((event) => res.status(200).json(event))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.patch('/:id', loginCheck(), (req, res, next) => {
console.log("event PATCH",req.body);
	// to update only one item in 
  const { what,newvalue } = req.body;
  Event.findOneAndUpdate(
    {_id: req.params.id, user: req.user},
    {[what]: newvalue},
    { new: true }
  )
    .then((event) => res.status(200).json(event))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.delete('/:id', loginCheck(), (req, res) => {
  Event.findOneAndDelete({_id: req.params.id, user: req.user})
    .then(() => res.status(200).json({ message: 'event deleted' }))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});




module.exports = router;
