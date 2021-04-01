const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.createUser = async (req, res) => {
  // check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extract email and password
  const { email, password } = req.body;

  try {
    // validate user unique
    const userRegistered = await User.findOne({ email });

    if (userRegistered) {
      return res.status(400).json({ msg: 'El usuario ya existe ' });
    }

    // create new user
    const user = new User(req.body);

    // hash password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // save new user
    await user.save();

    // Create JWT
    const payload = {
      user: {
        id: user.id,
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
    res.status(400).json({ msg: 'Hubo un error' });
  }
};
