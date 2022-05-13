// import express
const express = require('express')
//import controller
const {list, detail, update, add, hapus} = require('../controllers/users.controllers')
const {list_savedRecipes} = require('../controllers/savedRecipes.controllers')
const {list_recipes} = require('../controllers/recipes.controllers')
const {list_likedrecipes} = require('../controllers/likeRecipes.controllers')
const {list_comments} = require('../controllers/comments.controllers')

//panggil express
const router = express.Router();
// method untuk router 
router
.get('/users', list)
.get('/savedrecipes', list_savedRecipes)
.put('/recipes', list_recipes)
.post('/likedrecipes', list_likedrecipes)
.delete('/comments', list_comments)

//export router
module.exports = router;
