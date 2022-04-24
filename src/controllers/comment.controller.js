const { success, failed } = require('../helpers/response')
const commentModel = require('../models/comment.model')
const commentController = {
  showCommentByRecipe: (req, res) => {
    try {
      const recipeID = req.params.recipeID
      if (!recipeID) {
        throw Error('ID harus di isi')
      }
      commentModel.showCommentByRecipe(recipeID)
        .then((result) => {
          success(res, result.rows, 'success', 'get comment success')
        })
        .catch((err) => {
          failed(res, err, 'error', 'an error has occured')
        })
    } catch (err) {
      failed(res, null, 'error', err.message)
    }
  },
  postCommentByRecipe: (req, res) => {
    try {
      const recipeID = req.params.recipeID
      const commentText = req.body.comment_text
      const userID = req.APP_DATA.tokenDecoded.id
      if (!recipeID) {
        throw Error('recipe_id harus di isi')
      }
      if (!commentText) {
        throw Error('comment_text harus di isi')
      }
      if (!userID) {
        throw Error('user_id harus di isi')
      }
      commentModel.postCommentByRecipe(recipeID, commentText, userID)
        .then((result) => {
          success(res, null, 'success', 'sukses menambahkan komentar')
        })
        .catch((err) => {
          failed(res, err, 'error', 'an error has occured')
        })
    } catch (err) {
      failed(res, null, 'error', err.message)
    }
  },
  editComment: (req, res) => {
    try {
      const id = req.params.id
      const recipeID = req.body.recipe_id
      const commentText = req.body.comment_text
      const userID = req.APP_DATA.tokenDecoded.id
      if (!id) {
        throw Error('ID harus dikirim')
      }
      if (!recipeID) {
        throw Error('recipe_id harus diisi')
      }
      if (!commentText) {
        throw Error('comment_text harus diisi')
      }
      if (!userID) {
        throw Error('user_id harus diisi')
      }
      commentModel.checkAuthor(id)
        .then((result) => {
          if (result.rowCount > 0) {
            if (result.rows[0].user_id === userID) {
              commentModel.editComment(id, recipeID, commentText, userID)
                .then((result) => {
                  success(res, null, 'success', 'edit comment berhasil')
                })
                .catch((err) => {
                  failed(res, err, 'error', 'an error has occured')
                })
            } else {
              failed(res, null, 'error', 'forbidden')
            }
          } else {
            failed(res, null, 'error', 'comment tidak ditemukan')
          }
        })
        .catch((err) => {
          failed(res, err, 'error', 'an error has occured')
        })
    } catch (err) {
      failed(res, null, 'error', err.message)
    }
  },
  deleteComment: (req, res) => {
    try {
      const userID = req.APP_DATA.tokenDecoded.id
      const id = req.params.id
      if (!id) {
        throw Error('ID harus dikirim')
      }
      commentModel.checkAuthor(id)
        .then((result) => {
          if (result.rowCount > 0) {
            if (result.rows[0].user_id === userID) {
              commentModel.deleteComment(id)
                .then((result) => {
                  success(res, null, 'success', 'hapus comment berhasil')
                })
                .catch((err) => {
                  failed(res, err, 'error', 'an error has occured')
                })
            } else {
              failed(res, null, 'error', 'forbidden')
            }
          } else {
            failed(res, null, 'error', 'comment tidak ditemukan')
          }
        })
        .catch((err) => {
          failed(res, err, 'error', 'an error has occured')
        })
    } catch (err) {
      failed(res, null, 'error', err.message)
    }
  }
}
module.exports = commentController
