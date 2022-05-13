// eslint-disable-next-line no-unused-vars
const e = require('express')
const db = require('../config/db')
const recipesModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) as total FROM recipes', (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  createRecipe: (image, title, ingredients, video, userID) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO recipes (image, title, ingredients, video, date, user_id, is_active) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5, 1)', [image, title, ingredients, video, userID], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  myRecipe: (userID) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipes WHERE user_id=$1', [userID], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  recipesList: (field, type, limit, offset, name) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT recipes.id, recipes.image, title, ingredients, video, date, name FROM recipes INNER JOIN users ON recipes.user_id=users.id WHERE LOWER(title) LIKE LOWER('%${name}%') ORDER BY ${field} ${type} LIMIT ${limit} OFFSET ${offset} `, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updateRecipe: (id, image, title, ingredients, video, userID) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE recipes SET image=$1, title=$2, ingredients=$3, video=$4, date=current_timestamp, user_id=$5 WHERE id=$6', [image, title, ingredients, video, userID, id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  checkAuthor: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipes WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  deleteRecipe: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM recipes WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  showNewRecipe: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT recipes.id, recipes.image, title, ingredients, video, date, name FROM recipes INNER JOIN users ON recipes.user_id=users.id ORDER BY date DESC LIMIT 6', (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  showRecipeById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT recipes.id, recipes.image, title, ingredients, video, date, name FROM recipes INNER JOIN users ON recipes.user_id=users.id WHERE recipes.id= ${id}`, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
module.exports = recipesModel
