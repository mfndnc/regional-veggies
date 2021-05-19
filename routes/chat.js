const router = require('express').Router();
const Chat = require('../models/Chat');

const { loginCheck } = require('./midlware/middlewares');

/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.get('/user', loginCheck(), (req, res, next) => {
  Chat.find({ userclient: req.user._id })
    .then((chats) => res.status(200).json(chats))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/user/address/:addrid', loginCheck(), (req, res, next) => {
  Chat.find({ userclient: req.user._id, address: req.params.addrid })
    .then((chats) => res.status(200).json(chats))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/user/event/:eventid', loginCheck(), (req, res, next) => {
  Chat.findOne({ userclient: req.user._id, event: req.params.eventid })
    .then((chats) => res.status(200).json(chats))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/user/bookmark/:bookmarkid', loginCheck(), (req, res, next) => {
  Chat.findOne({ userclient: req.user._id, bookmark: req.params.bookmarkid })
    .then((chats) => res.status(200).json(chats))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/address/:addrid', loginCheck(), (req, res, next) => {
  Chat.find({ userowner: req.user._id, address: req.params.addrid }, null, {
    sort: { updatedAt: -1 },
  })
    .populate('address')
    .populate('event')
    .populate('userclient', ['name', 'email', 'phone'])
    .then((chats) => res.status(200).json(chats))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/event/:eventid', loginCheck(), (req, res, next) => {
  Chat.find({ userowner: req.user._id, event: req.params.eventid }, null, {
    sort: { updatedAt: -1 },
  })
    .populate('address')
    .populate('event')
    .populate('userclient', ['name', 'email', 'phone'])
    .then((chats) => res.status(200).json(chats))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/address/:addrid/count', loginCheck(), (req, res, next) => {
  Chat.countDocuments({ userowner: req.user._id, address: req.params.addrid })
    .then((count) => res.status(200).json(count))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/event/:eventid/count', loginCheck(), (req, res, next) => {
  Chat.countDocuments({ userowner: req.user._id, event: req.params.eventid })
    .then((count) => res.status(200).json(count))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.post('/', loginCheck(), (req, res, next) => {
  console.log('chat POST', req.body);
  const { message, origin, _id, __v, ...rest } = req.body;
  const conversation = [{ message, origin, time: Date.now(), read: false }];
  console.log('chat POST', rest, conversation);
  const savedata = { ...rest, conversation };
  Chat.findOneOrCreate(savedata)
    .then((chats) => res.status(200).json(chats))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.put('/push/:id', (req, res, next) => {
  const { message, origin } = req.body;
  const conversation = [{ message, origin, time: Date.now(), read: false }];
  Chat.findByIdAndUpdate(req.params.id, { $push: { conversation } })
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
