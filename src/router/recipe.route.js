const express = require('express')
const router = express.Router()
const { createRecipe, recipeList, myRecipe, updateRecipe, deleteRecipe, showNewRecipe, showRecipeById } = require('../controllers/recipes.controllers')
const jwtAuth = require('../middleware/jwtAuth')
const { isCustomer } = require('../middleware/auth')
const { isVerified } = require('../middleware/isVerified')
const upload = require('../middleware/upload')

router
  .get('/addrecipe', jwtAuth, isVerified, isCustomer, updateRecipe)
  .post('/insert/recipe', jwtAuth, isVerified, isCustomer, upload, createRecipe) // For create a new recipe
  .get('/list/recipe', jwtAuth, isVerified, recipeList) // For showing recipe
  .get('/show/myrecipe/', jwtAuth, isVerified, isCustomer, myRecipe) // For show your own recipe
  .put('/edit/recipe/:id', jwtAuth, isVerified, isCustomer, upload, updateRecipe) // For updating recipe
  .delete('/delete/recipe/:id', jwtAuth, isVerified, isCustomer, deleteRecipe) // For delete data on recipe by id
  .get('/recipe/latest', showNewRecipe) // For showing the latest data on recipe by date
  .get('/recipe/detail/:id', jwtAuth, isVerified, showRecipeById) // For showing data on a recipe based on author // id user

module.exports = router
