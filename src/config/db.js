require('dotenv').config()
const { Pool } = require('pg')
const db = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})
db.connect((err) => {
  if (err) {
    console.log(err)
  }
})
module.exports = db
