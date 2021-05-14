const { Schema, model } = require('mongoose');

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    showoffline: Boolean,
    note: String,
    promo: String,
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    phone: String,
    website: String,
    skype: String,
    whatsapp: String,
    twitter: String,
    country: {
      type: String,
      default: 'Germany',
    },
    geo: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

const Address = model('Address', addressSchema);

module.exports = Address;
