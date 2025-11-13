const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./env')

// Return a Promise-wrapped JWT sign to use async/await safely
module.exports = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d' }, (err, token) => {
      if (err) return reject(err)
      resolve(token)
    })
  })
}
