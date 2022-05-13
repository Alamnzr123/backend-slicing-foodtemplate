const db = require('../config/db')

const commentsModel= {
    selectAll: () => {
        //Gunakan promise
        return new Promise((resolve, reject) =>{
            db.query(`SELECT * FROM comments`, (err, result) =>{
                if(err) {
                    reject(err)
                }
                resolve(result)
            });
        })
    }
}

module.exports = commentsModel;