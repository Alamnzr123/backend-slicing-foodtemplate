const db = require('../config/db')

const savedRecipes = {
    selectAll: () => {
        //Gunakan promise
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM saved_recipes`, (err, result) =>{
                if(err) {
                    reject(err)
                }
                resolve(result)
            });
        })
    }
}

module.exports = savedRecipes;