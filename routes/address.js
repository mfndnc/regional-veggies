const router = require('express').Router();
const Address = require('../models/Address');

const { loginCheck } = require('./midlware/middlewares');
const { geoCodeApi } = require('./midlware/googleGeo');

function setGeoCode(address, forgoogle = '') {
  if (!forgoogle.length) {
    forgoogle = `${address.street}, ${address.zipcode} ${address.city}`;
  }
  if (forgoogle.length > 0) {
    geoCodeApi(forgoogle).then((el) => {
      console.log(el.data);
      if (
        el &&
        el.data &&
        el.data.results &&
        el.data.results[0] &&
        el.data.results[0].formatted_address
      ) {
        const {
          results: {
            0: {
              geometry: { location: geo },
              formatted_address: googleaddress,
              place_id: googleid,
            },
          },
        } = el.data;
        Address.findByIdAndUpdate(
          address._id,
          { geo, googleaddress },
          { new: true }
        ).then((res) => res);
      }
    });
  }
  return;
}


/* ***** SPECIAL to this router - actions on the logged user * no id required */

router.get('/user', loginCheck(), (req, res, next) => {
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

router.get('/business', loginCheck(), (req, res, next) => {
  console.log('address business GET', req.query);
  Address.find({
    $and: [
      {
        $nor: [
          { addrtype: { $regex: 'user' } },
          { addrtype: { $regex: 'private' } },
        ],
      },
      { name: { $exists: true, $ne: null, $ne: '' } },
    ],
  })
    .then((address) => res.status(200).json(address))
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});
/* ***** SPECIAL to this router - actions on the logged user * no id required */


router.post('/', loginCheck(), (req, res, next) => {
  console.log('address POST', req.body);
  const { user,showoffline,note,promo,addrtype,nickname,name,street,suite,city,zipcode,phone,website,skype,whatsapp,twitter } = req.body;
  Address.create({user: req.user,showoffline,note,promo,addrtype,nickname,name,street,suite,city,zipcode,phone,website,skype,whatsapp,twitter })
    .then((address) => {
      setGeoCode(address);
      return res.status(201).json(address);
    })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.get('/', loginCheck(), (req, res, next) => {
  console.log('address GET', req.query);
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
console.log("address PUT",req.body);
  const { showoffline,note,promo,addrtype,nickname,name,street,suite,city,zipcode,phone,website,skype,whatsapp,twitter } = req.body;
  Address.findOneAndUpdate(
    {_id: req.params.id, user: req.user},
    { showoffline,note,promo,addrtype,nickname,name,street,suite,city,zipcode,phone,website,skype,whatsapp,twitter }
  )
    .then((address) => {
      // getting former document to compare with request
      if (
        (address.street && street && address.street !== street) ||
        (address.zipcode && zipcode && address.zipcode !== zipcode) ||
        (address.city && city && address.city !== city)
      ) {
		const forgoogle = `${street}, ${zipcode} ${city}`;
        setGeoCode(address,forgoogle);
      }
      return res.status(201).json(address);
    })
    .catch((err) => res.status(400).json({ message: 'An error occured' }));
});

router.patch('/:id', loginCheck(), (req, res, next) => {
console.log("address patch",req.body);
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
