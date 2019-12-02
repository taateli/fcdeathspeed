const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Player = require('../../models/Player');

// @route   GET api/players
// @desc    Get players
// @access  Public
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    return res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/players/player/:id
// @desc    Delete a player
// @access  Private
router.delete('/player/:id', auth, async (req, res) => {
  try {
    await Player.findOneAndRemove({ _id: req.params.id });
    res.send({ msg: 'Player removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @route   POST api/players
// @desc    Post a player
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('shirtnumber', 'Shirt number is required')
        .not()
        .isEmpty(),
      check('bio', 'Bio is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, shirtnumber, bio, active } = req.body;

    const playerFields = {};

    if (name) playerFields.name = name;
    if (shirtnumber) playerFields.shirtnumber = shirtnumber;
    if (bio) playerFields.bio = bio;
    if (active) playerFields.active = active;

    try {
      let player = await Player.findOne({ name: name });

      if (player) {
        player = await Player.findOneAndUpdate(
          { name: name },
          { $set: playerFields },
          { new: true }
        );

        return res.json(player);
      }

      player = new Player(playerFields);
      await player.save();
      return res.json(player);
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        // Duplicate shirtnumber
        return res.status(422).send({ message: 'Shirtnumber already in use!' });
      }
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
