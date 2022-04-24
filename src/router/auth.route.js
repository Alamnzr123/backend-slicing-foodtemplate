const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/auth.controller')
// eslint-disable-next-line no-unused-vars
const upload = require('../middleware/upload')
router
  // .post('/register', upload, register) // For register user
  .post('/register', register)
  .post('/login', login) // For login user
module.exports = router
