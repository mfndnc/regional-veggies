const { Schema, model } = require('mongoose');

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    showoffline: {
      type: Boolean,
      default: 'false',
    },
    name: String,
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
    googleid: String,
    googleaddress: String,
  },
  {
    timestamps: true,
  }
);

addressSchema.static(
  'findOneOrCreate',
  async function findOneOrCreate(condition, address) {
    const one = await this.findOne(condition);

    return one || this.create(address);
  }
);

const Address = model('Address', addressSchema);

module.exports = Address;
