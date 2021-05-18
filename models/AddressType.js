const { Schema, model } = require('mongoose');

// not connected really - just to allow creating a list

const addresstypeSchema = new Schema({
  abr: String,
  text: String,
  role: {
    type: String,
    enum: ['admin', 'moderator', 'farm', 'shop', 'private', 'user'],
    default: ['user'],
  },
});

const Addresstype = model('Addresstype', addresstypeSchema);

module.exports = Addresstype;
