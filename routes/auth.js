const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/signup', (req, res, next) => {
  const { username,name, password } = req.body;
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: 'Your password has to be 8 chars min' });
  }
  if (username === '') {
    return res.status(400).json({ message: 'Your username cannot be empty' });
  }
  User.findOne({ username: username }).then((userFromDB) => {
    if (userFromDB !== null) {
      return res
        .status(400)
        .json({ message: 'This username is already taken' });
    } else {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);
      User.create({ username: username, password: hash })
        .then((createdUser) => {
          req.login(createdUser, (err) => {
            if (err) {
              return res
                .status(500)
                .json({ message: 'Error while attempting to login' });
            } else {
              const { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role, createdAt, _id: id } = createdUser;
              const exportuser = { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role, createdAt, id };
              return res.status(200).json(exportuser);
            }
          });
        })
        .catch((err) => res.status(400).json({ message: 'An error occured' }));
    }
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err)  return res.status(400).json({ message: 'Error while logging in' });
    if (!user) return res.status(400).json({ message: 'Wrong credentials' });

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error while logging in' });
      }
      const { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role, createdAt, _id: id } = user;
      const exportuser = { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role, createdAt, id };
      return res.status(200).json(exportuser);
    });
  })(req, res);
});

router.get('/loggedin', (req, res) => {
  	let exportuser;
	if(req.user) {
  		const { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role, createdAt, _id: id } = req.user;
  		exportuser = { username,name,note,email,phone,phonesecond,website,skype,whatsapp,twitter,role, createdAt, id };
	} else {
		exportuser = null;
	}
  res.json(exportuser);
});

router.delete('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Successful Logout' });
});

module.exports = router;
