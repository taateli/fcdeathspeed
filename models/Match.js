const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  text: {
    type: Schema.Types.String,
    required: true
  },
  link: {
    type: Schema.Types.String
  },
  video: {
    type: Schema.Types.String
  },
  for: {
    type: Schema.Types.Number,
    required: true
  },
  against: {
    type: Schema.Types.Number,
    required: true
  },
  goals: [
    {
      scorer: {
        type: Schema.Types.ObjectId,
        ref: 'players',
        required: true
      },
      assist: {
        type: Schema.Types.ObjectId,
        ref: 'players'
      }
    }
  ],
  opponent: {
    type: Schema.Types.String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
