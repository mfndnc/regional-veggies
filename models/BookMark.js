const { Schema, model } = require('mongoose');

const bookMarkSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    comment: String,
  },
  {
    timestamps: true,
  }
);

bookMarkSchema.static('findOneOrCreate', async function findOneOrCreate(data) {
  const { event, user } = data;
  const one = await this.findOne({ event, user });
  //console.log('bookMarkSchema one', one);

  return one || this.create(data);
});

// not really working. Try one day to fix it
bookMarkSchema.static(
  'updateOneOrCreate',
  async function findOneOrCreate(data) {
    const { event, user } = data;
    const one = await this.findOne({ event, user });
    if (one) {
      const two = await this.findOneAndUpdate({ event, user }, data, {
        new: true,
      });
    }

    return two || one || this.create(data);
  }
);

// not really working. Try one day to fix it
bookMarkSchema.statics.updateOneOrCreatex = function updateOneOrCreatex(data) {
  const self = this;
  const { event, user } = data;
  const condition = { event, user };
  const newDocument = data;
  return new Promise((resolve, reject) => {
    return self
      .findAndUpdate(condition, newDocument, { new: true })
      .then((result) => {
        if (result) {
          //console.log(1);
          return resolve(result);
        }
        return self
          .create(newDocument)
          .then((result) => {
            //console.log(2);
            return resolve(result);
          })
          .catch((error) => {
            //console.log(3);
            return reject(error);
          });
      })
      .catch((error) => {
        //console.log(4);
        return reject(error);
      });
  });
};

const BookMark = model('BookMark', bookMarkSchema);

module.exports = BookMark;
