const db = require('../config/db')
const commentModel = {
  checkAuthor: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * from comment WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  showCommentByRecipe: (recipeID) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT user_id, comment_text FROM comment WHERE recipe_id=$1', [recipeID], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  postCommentByRecipe: (recipeID, commentText, userID) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO comment (recipe_id, comment_text, user_id) VALUES ($1, $2, $3)', [recipeID, commentText, userID], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  editComment: (id, recipeID, commentText, userID) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE comment SET recipe_id=$1, comment_text=$2, user_id=$3 WHERE id=$4', [recipeID, commentText, userID, id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  deleteComment: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM comment WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
module.exports = commentModel
