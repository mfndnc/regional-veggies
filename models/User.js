const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    note: String,
    name: String,
    email: String,
    phone: String,
    phonesecond: String,
    website: String,
    skype: String,
    whatsapp: String,
    twitter: String,
    password: String,
    role: {
      type: [String],
      enum: ['admin', 'moderator', 'farm', 'shop', 'private', 'user'],
      default: ['user'],
    },
  },
  {
    timestamps: true,
  }
);


userSchema.static(
  'findOneOrCreate',
  async function findOneOrCreate(condition, user) {
    const one = await this.findOne(condition);

    return one || this.create(user);
  }
);

const User = model('User', userSchema);

module.exports = User;
