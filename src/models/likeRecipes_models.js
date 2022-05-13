const db = require('../config/db')

const likeRecipes= {
    selectAll: () => {
        //Gunakan promise
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM liked_recipes`, (err, result) =>{
                if(err) {
                    reject(err)
                }
                resolve(result)
            });
        })
    }
}

module.exports = likeRecipes;