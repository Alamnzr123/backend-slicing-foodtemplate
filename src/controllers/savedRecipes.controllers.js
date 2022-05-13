const savedRecipes = require('../models/savedRecipes.model')
//method
const savedRecipesControllers = {
    //format pemanggila
    list_savedRecipes: (req, res) => {
        savedRecipes
        .selectAll()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });
    }
}

module.exports = savedRecipesControllers;