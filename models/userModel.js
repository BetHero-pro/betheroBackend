const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    discordID: {
      type: Number,
      unique: true,
      required: true,
    },
    avatarID: {
      type: String,
      unique: true,
      required: true,
    },
    isOnline:{
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model('Users', UserSchema);
