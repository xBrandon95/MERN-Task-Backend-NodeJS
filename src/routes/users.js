const { Router } = require('express');
const { check } = require('express-validator');

const { createUser } = require('../controllers/userController');

// api/users

const router = Router();

// create users
router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({
      min: 6,
    }),
  ],
  createUser,
);

// get users
module.exports = router;
