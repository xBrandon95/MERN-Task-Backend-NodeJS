const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.authUser = async (req, res) => {
  // check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extract email and password
  const { email, password } = req.body;

  try {
    // check user registered
    const userRegistered = await User.findOne({ email });

    if (!userRegistered) {
      return res.status(400).json({ msg: 'El usuario no existe' });
    }

    // check password
    const passSuccess = await bcryptjs.compare(
      password,
      userRegistered.password,
    );

    if (!passSuccess) {
      return res.status(400).json({ msg: 'Password incorrecto' });
    }

    // Create JWT
    const payload = {
      user: {
        id: userRegistered.id,
      },
    };

    // Firm JWT
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 60 * 60,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      },
    );
  } catch (error) {
    console.log(error);
  }
};

exports.authenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};
