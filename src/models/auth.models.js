const db = require('../config/db')
const authModel = {
  checkEmailRegistered: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) FROM users WHERE email=$1', [email], (err, result) => {
        if (err) {
          reject(err)
        } else if (result.rows[0].count > 0) {
          reject(new Error('Email telah terdaftar!'))
        } else {
          resolve(result)
        }
      })
    })
  },
  register: ({ name, email, password, phone, image }) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (name, email, password, phone, image, level, is_verified, is_active) VALUES ($1, $2, $3, $4, $5, 1, 1, 1)', [name, email, password, phone, image], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  login: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email=$1', [email], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
module.exports = authModel
