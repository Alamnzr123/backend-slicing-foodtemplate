const comments = require('../models/comments.model')
//method
const commentControllers = {
    //format pemanggila
    list_comments: (req, res) => {
        comments
        .selectAll()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });
    }
}

module.exports = commentControllers;