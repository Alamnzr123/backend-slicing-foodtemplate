const express = require('express')
const router = express.Router()
const { showCommentByRecipe, postCommentByRecipe, editComment, deleteComment } = require('../controllers/comment.controller')
const jwtAuth = require('../middleware/jwtAuth')
const { isCustomer } = require('../middleware/authorization')
const { isVerified } = require('../middleware/isVerified')
router
  .get('/comment/:recipeID', jwtAuth, isVerified, showCommentByRecipe)
  .post('/post/comment/:recipeID', jwtAuth, isVerified, isCustomer, postCommentByRecipe)
  .put('/edit/comment/:id', jwtAuth, isVerified, isCustomer, editComment)
  .delete('/delete/comment/:id', jwtAuth, isVerified, isCustomer, deleteComment)

module.exports = router
