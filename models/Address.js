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
    nickname: String,
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
    addrtype: String,
    imagefile: Schema.Types.Mixed,
    googleimage: Schema.Types.Mixed,
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

addressSchema.index({ '$**': 'text' });

addressSchema.static(
  'findOneOrCreate',
  async function findOneOrCreate(condition, address) {
    const one = await this.findOne(condition);

    return one || this.create(address);
  }
);

addressSchema.static(
  'updateOneOrCreate',
  async function findOneOrCreate(condition, address) {
    const one = await this.findOne(condition);
    if (one) {
      const two = await this.findOneAndUpdate(condition, address, {
        new: true,
      });
    }

    return two || one || this.create(address);
  }
);

const Address = model('Address', addressSchema);

module.exports = Address;
