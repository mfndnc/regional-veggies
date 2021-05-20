const router = require('express').Router();
const User = require('../models/User');

const { loginCheck } = require('./midlware/middlewares');


/* ***** SPECIAL to this router - actions on the logged user * no id required */
router.get('/user', loginCheck(), (req, res, next) => {
  User.findOne({_id: req.user._id})
    .then((user) => {
      const { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, _id: id } = user;
      const exportuser = { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, id };
      res.status(200).json(exportuser);
    })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});
/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.post('/', loginCheck(), (req, res, next) => {
  // not allowed here
  res.status(400).json({});
});

router.get('/', loginCheck(), (req, res, next) => {
  User.find()
    .then((users) => {
      const exportedUsers = users.map((el) => {
        const { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, _id: id } = el;
        return { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, id };
      });
      return res.status(200).json(exportedUsers);
    })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});



router.get('/:id', loginCheck(), (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    if (!user) {
      res.status(400).json({});
    } else {
      const { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, _id: id } = user;
      const exportuser = { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, id };
      res.status(200).json(exportuser);
    }
  });
});


/* ***** !!! it will ignore the ID. keep it for backward compatibility  */

router.put('/:id', loginCheck(), (req, res, next) => {
  const { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile } = req.body;
  User.findOneAndUpdate(
    {_id: req.user._id},
    { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile },
    // if the return value of the mongoose should be the updated document you need to add this
    { new: true }
  )
    .then((user) => {
      const { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, _id: id } = user;
      const exportuser = { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, id };
      res.status(200).json(exportuser);
    })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.patch('/:id', loginCheck(), (req, res, next) => {
  const { what,newvalue } = req.body;
  User.findOneAndUpdate(
    {_id: req.user._id},
    {[what]: newvalue},
    { new: true }
  )
    .then((user) => {
      const { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, _id: id } = user;
      const exportuser = { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, id };
      res.status(200).json(exportuser);
    })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.delete('/:id', loginCheck(), (req, res) => {
  // not allowed here
  res.status(400).json({});
});


/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.put('/', loginCheck(), (req, res, next) => {
  const { name,note,email,phone,phonesecond,website,skype,whatsapp,twitter } = req.body;
  User.findOneAndUpdate(
    {_id: req.user._id},
    { name,note,email,phone,phonesecond,website,skype,whatsapp,twitter },
    { new: true }
  )
    .then((user) => {
      const { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, _id: id } = user;
      const exportuser = { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, id };
      res.status(200).json(exportuser);
    })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.patch('/', loginCheck(), (req, res, next) => {
  const { what,newvalue } = req.body;
  User.findOneAndUpdate(
    {_id: req.user._id},
    {[what]: newvalue},
    { new: true }
  )
    .then((user) => {
      const { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, _id: id } = user;
      const exportuser = { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role,imagefile, createdAt, id };
      res.status(200).json(exportuser);
    })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.delete('/', loginCheck(), (req, res) => {
  const oldme = {_id: req.user._id};
  req.logout();
  User.findOneAndDelete(oldme)
    .then(() => res.status(200).json({ message: 'user deleted' }))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

module.exports = router;
