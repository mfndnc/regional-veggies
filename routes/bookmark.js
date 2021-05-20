const router = require('express').Router();
const BookMark = require('../models/BookMark');

const { loginCheck } = require('./midlware/middlewares');

/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.get('/user', loginCheck(), (req, res, next) => {
  BookMark.find({ user: req.user._id })
    .populate('address')
    .populate('event')
    .then((bookmarks) => res.status(200).json(bookmarks))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/user/count', loginCheck(), (req, res, next) => {
  BookMark.countDocuments({ user: req.user._id })
    .then((count) => res.status(200).json(count))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/user/address/:addrid', loginCheck(), (req, res, next) => {
  BookMark.find({ user: req.user._id, address: req.params.addrid })
    .then((bookmarks) => res.status(200).json(bookmarks))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/user/event/:eventid', loginCheck(), (req, res, next) => {
  BookMark.findOne({ user: req.user._id, event: req.params.eventid })
    .then((bookmarks) => res.status(200).json(bookmarks))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/save', loginCheck(), (req, res, next) => {
  //console.log('sabe bookmark with url queries GET', req.params, req.query);
  if (req.query.eventid) {
    BookMark.findOneOrCreate({ user: req.user._id, event: req.query.eventid })
      .then((bookmarks) => res.status(200).json(bookmarks))
      .catch((err) => res.status(400).json({ message: 'An error occured' }));
  } else {
    res.status(400).json({ message: 'Not wnough information' });
  }
});


router.get('/address/:addrid', loginCheck(), (req, res, next) => {
  BookMark.find({ address: req.params.addrid })
    .then((bookmarks) => res.status(200).json(bookmarks))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/address/:addrid/count', loginCheck(), (req, res, next) => {
  BookMark.countDocuments({ address: req.params.addrid })
    .then((count) => res.status(200).json(count))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/event/:eventid', loginCheck(), (req, res, next) => {
  BookMark.find({ event: req.params.eventid })
    .then((bookmarks) => res.status(200).json(bookmarks))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/event/:eventid/count', loginCheck(), (req, res, next) => {
  BookMark.countDocuments({ event: req.params.eventid })
    .then((count) => res.status(200).json(count))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.delete('/', loginCheck(), (req, res, next) => {
  //console.log('bookmark DELETE', req.query);
  if (req.query.event) {
    const deletedata = { event: req.query.event, user: req.user._id };
    BookMark.findOneAndDelete(deletedata)
      .then(() => res.status(200).json({ message: 'bookmark deleted' }))
      .catch((err) => res.status(400).json({ message: 'An error occured' }));
  } else {
    res.status(400).json({ message: 'Not wnough information' });
  }
});

/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.post('/', loginCheck(), (req, res, next) => {
  //console.log('bookmark POST', req.body);
  const { event, address, comment, tag } = req.body;
  const savedata = { event, address, comment, tag };
  if (req.body.user) {
    savedata.user = req.body.user;
  } else {
    savedata.user = req.user._id;
  }

  if (savedata) {
    BookMark.findOneAndUpdate({ event, user: savedata.user }, savedata, {
      new: true,
    })
      .then((bookmarks) => {
        if (!bookmarks) {
          BookMark.create(savedata)
            .then((bookmarks) => res.status(201).json(bookmarks))
            .catch((err) =>
              res.status(400).json({ message: 'An error occured - create' })
            );
        } else {
          return res.status(200).json(bookmarks);
        }
      })
      .catch((err) =>
        res.status(400).json({ message: 'An error occured - update' })
      );
  } else {
    res.status(400).json({ message: 'Not wnough information' });
  }
});

router.get('/', loginCheck(), (req, res, next) => {
  BookMark.find()
    .then((bookmarks) => res.status(200).json(bookmarks))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/:id', loginCheck(), (req, res, next) => {
  BookMark.findById(req.params.id)
    .then((bookmark) => {
      if (!bookmark) {
        return res.status(400).json(bookmark);
      } else {
        return res.status(200).json(bookmark);
      }
    })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.put('/:id', loginCheck(), (req, res, next) => {
  //console.log('bookmark PUT', req.body);
  const { event } = req.body;
  BookMark.findOneAndUpdate(
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
    .then((bookmark) => res.status(200).json(bookmark))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.patch('/:id', loginCheck(), (req, res, next) => {
  //console.log('bookmark PATCH', req.body);
  // to update only one item in
  const { what, newvalue } = req.body;
  BookMark.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { [what]: newvalue },
    { new: true }
  )
    .then((bookmark) => res.status(200).json(bookmark))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.delete('/:id', loginCheck(), (req, res) => {
  BookMark.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    .then(() => res.status(200).json({ message: 'bookmark deleted' }))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

module.exports = router;
