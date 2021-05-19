const router = require('express').Router();
const Chat = require('../models/Chat');

const { loginCheck } = require('./midlware/middlewares');

/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.get('/user', loginCheck(), (req, res, next) => {
  Chat.find({ user: req.user._id })
    .then((chats) => res.status(200).json(chats))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/user/address/:addrid', loginCheck(), (req, res, next) => {
  Chat.find({ user: req.user._id, address: req.params.addrid })
    .then((chats) => res.status(200).json(chats))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/user/event/:eventid', loginCheck(), (req, res, next) => {
  Chat.findOne({ user: req.user._id, event: req.params.eventid })
    .then((chats) => res.status(200).json(chats))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/save', loginCheck(), (req, res, next) => {
  console.log('sabe chat with url queries GET', req.params, req.query);
  if (req.query.eventid) {
    Chat.findOneOrCreate({ user: req.user._id, event: req.query.eventid })
      .then((chats) => res.status(200).json(chats))
      .catch((err) => res.status(400).json({ message: 'An error occured' }));
  } else {
    res.status(400).json({ message: 'Not wnough information' });
  }
});

router.delete('/', loginCheck(), (req, res, next) => {
  console.log('chat DELETE', req.query);
  if (req.query.event) {
    const deletedata = { event: req.query.event, user: req.user._id };
    Chat.findOneAndDelete(deletedata)
      .then(() => res.status(200).json({ message: 'chat deleted' }))
      .catch((err) => res.status(400).json({ message: 'An error occured' }));
  } else {
    res.status(400).json({ message: 'Not wnough information' });
  }
});

/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.post('/', loginCheck(), (req, res, next) => {
  console.log('chat POST', req.body);
  const { TODO } = req.body;
  const savedata = { TODO };
  Chat.findOneOrCreate(savedata)
  .then((chats) => res.status(200).json(chats))
  .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/', loginCheck(), (req, res, next) => {
  Chat.find()
    .then((chats) => res.status(200).json(chats))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/:id', loginCheck(), (req, res, next) => {
  Chat.findById(req.params.id)
    .then((chat) => {
      if (!chat) {
        return res.status(400).json(chat);
      } else {
        return res.status(200).json(chat);
      }
    })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.put('/:id', loginCheck(), (req, res, next) => {
  console.log('chat PUT', req.body);
  const { event } = req.body;
  Chat.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    {
      address,
      address2,
      isFromToAddr,
      showoffline,
      note,
      promo,
      calendar,
      danteRange,
    },
    { new: true }
  )
    .then((chat) => res.status(200).json(chat))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.patch('/:id', loginCheck(), (req, res, next) => {
  console.log('chat PATCH', req.body);
  // to update only one item in
  const { what, newvalue } = req.body;
  Chat.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { [what]: newvalue },
    { new: true }
  )
    .then((chat) => res.status(200).json(chat))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.delete('/:id', loginCheck(), (req, res) => {
  Chat.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    .then(() => res.status(200).json({ message: 'chat deleted' }))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

module.exports = router;
