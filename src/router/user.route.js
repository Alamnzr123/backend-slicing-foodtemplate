const express = require('express')
const router = express.Router()
const { updateData, showAllUser, deleteUser, detailUser } = require('../controllers/user.controller')
const jwtAuth = require('../middleware/jwtAuth')
const { isAdmin, isCustomerWithSameId } = require('../middleware/authorization')
const { isVerified } = require('../middleware/isVerified')
const upload = require('../middleware/upload')

router
  .get('/list/user', jwtAuth, isVerified, isAdmin, showAllUser) // For showing all data on users
  .get('/detail/user/:id', jwtAuth, isVerified, isCustomerWithSameId, detailUser)
  .put('/edit/user/:id', jwtAuth, isVerified, isCustomerWithSameId, upload, updateData) // For updating data on users by id
  .delete('/delete/user/:id', jwtAuth, isVerified, isCustomerWithSameId, deleteUser) // For deleting data on users by id
  // .put('/suspend/user/:id', jwtAuth, isVerified, isAdmin, suspendUser) // suspend user by admin

module.exports = router
