require('dotenv').config()
const { Pool } = require('pg')
const shouldUseSsl = (process.env.DB_SSL || '').toLowerCase() === 'true'

const poolConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}

if (shouldUseSsl) {
  poolConfig.ssl = { rejectUnauthorized: false }
}

const db = new Pool(poolConfig)
db.connect((err) => {
  if (err) {
    console.log(err)
  }
})
module.exports = db
