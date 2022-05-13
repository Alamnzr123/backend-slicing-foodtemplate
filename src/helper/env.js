require('dotenv').config()

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  SERVER_PORT: process.env.SERVER_PORT,
  JWT_SECRET: process.env.JWT_SECRET
}
