const mongoose = require('mongoose');
const Quest = require('./questModel'); // import the Quest schema
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema(
  {
    ID: {
      type: 'String',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quests: [Quest.schema], // use Quest schema here
  },
  { timestamps: true },
);

module.exports = mongoose.model('Playlist', PlaylistSchema);
