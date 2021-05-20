const router = require('express').Router();
const AddressType = require('../models/AddressType');
const Address = require('../models/Address');
const Event = require('../models/Event');

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

router.get('/search', loginCheck(), (req, res, next) => {
  //console.log('address business GET', req.query);
  const searchobj = { $text: { $search: req.query.query } };
  const fullquery = {
    $and: [
      {
        $nor: [
          { addrtype: { $regex: 'user' } },
          { addrtype: { $regex: 'private' } },
        ],
      },
      { name: { $exists: true, $ne: null, $ne: '' } },
      searchobj,
    ],
  };
  Promise.all([
    Address.find(fullquery),
    Event.find(searchobj).populate('address'),
  ])
    .then(([addr, ev]) => {
      const eventaddr = ev.map((e) => e.address);
      const unique = [...addr, ...eventaddr]
        .sort((a, b) => ('' + a.name).localeCompare(b.name))
        .filter(
          (obj, pos, self) =>
            self.map((mapObj) => mapObj._id).indexOf(obj._id) === pos
        );

      return res.status(200).json(unique);
    })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

module.exports = router;
