const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('username', 'Please give correct username').exists(),
    check('password', 'Password required').exists()
  ],
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { username, password } = request.body;
    try {
      if (username !== 'admin') {
        return response
          .status(400)
          .json({ errors: [{ msg: 'Credentials are invalid' }] });
      }
      if (password !== 'deathspeedfc') {
        return response
          .status(400)
          .json({ errors: [{ msg: 'Credentials are invalid' }] });
      }

      const payload = {
        user: {
          name: 'admin'
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          response.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      response.status(500).send('Server error');
    }
  }
);

module.exports = router;
