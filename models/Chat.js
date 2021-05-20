const { Schema, model } = require('mongoose');

const chatSchema = new Schema(
  {
    userowner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    userclient: {
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
    bookmark: {
      type: Schema.Types.ObjectId,
      ref: 'BookMark',
    },
    unread: {
      type: Boolean,
      default: 'false',
    },
    conversation: [Schema.Types.Mixed],
    initiatedby: {
      type: String,
      default: 'client',
    },
    closed: {
      type: Boolean,
      default: 'false',
    },
  },
  {
    timestamps: true,
  }
);


chatSchema.static('findOneOrCreate', async function findOneOrCreate(data) {
  const { bookmark, userclient } = data;
  const one = await this.findOne({ bookmark, userclient, closed: false });
  //console.log('chatSchema ONE', one);

  return one || this.create(data);
});


const Chat = model('Chat', chatSchema);

module.exports = Chat;
