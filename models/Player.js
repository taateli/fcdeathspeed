const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  shirtnumber: {
    type: Number,
    required: true,
    unique: true
  },
  bio: {
    type: String,
    required: true
  },
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  active: {
    type: Boolean,
    default: true
  },
  appearences: {
    type: Schema.Types.Number,
    default: 0
  }
});

module.exports = Player = mongoose.model('player', PlayerSchema);
