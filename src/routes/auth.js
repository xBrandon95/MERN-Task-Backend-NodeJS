const { Router } = require('express');
const { check } = require('express-validator');
const {
  authUser,
  authenticatedUser,
} = require('../controllers/authController');
const auth = require('../middleware/auth');
// api/auth

const router = Router();

// create users
router.post('/', [
  check('email', 'Agrega un email valido').isEmail(),
  check('password', 'El password debe ser minimo de 6 caracteres').isLength({
    min: 6,
  }),
  authUser,
]);

// get user
router.get('/', auth, authenticatedUser);
module.exports = router;
