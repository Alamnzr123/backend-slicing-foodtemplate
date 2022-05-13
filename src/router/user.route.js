const express = require('express')
const router = express.Router()
const { updateData, showAllUser, deleteUser, detailUser } = require('../controllers/users.controllers')
const jwtAuth = require('../middleware/jwtAuth')
const { isAdmin, isCustomerWithSameId } = require('../middleware/auth')
const { isVerified } = require('../middleware/isVerified')

router
  .get('/list/user', jwtAuth, isVerified, isAdmin, showAllUser) // For showing all data on users
  .get('/detail/user/:id', jwtAuth, isVerified, isCustomerWithSameId, detailUser)
  .put('/edit/user/:id', jwtAuth, isVerified, isCustomerWithSameId, updateData) // For updating data on users by id
  .delete('/delete/user/:id', jwtAuth, isVerified, isCustomerWithSameId, deleteUser) // For deleting data on users by id

module.exports = router
