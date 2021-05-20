const { Schema, model } = require('mongoose');

// TODO. remove user from Schema since it is redundant

const eventSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    address2: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    isFromToAddr: Boolean,
    showoffline: Boolean,
    note: String,
    promo: String,
    calendar: [Date],
    danteRange: Boolean,
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ '$**': 'text' });

eventSchema.static(
  'findOneOrCreate',
  async function findOneOrCreate(condition, event) {
    const one = await this.findOne(condition);

    return one || this.create(event);
  }
);


const Event = model('Event', eventSchema);

module.exports = Event;
