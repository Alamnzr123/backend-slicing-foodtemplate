const likeRecipes = require('../models/likeRecipes_models')
const likeRecipesController = {
  list_likedrecipes: (req, res) => {
    likeRecipes
      .selectAll()
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  }
}

module.exports = likeRecipesController
