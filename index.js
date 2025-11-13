require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const userRoute = require('./src/router/user.route')
const recipeRoute = require('./src/router/recipe.route')
const authRoute = require('./src/router/auth.route')
const morgan = require('morgan')
const cache = require('./src/config/cache')

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(helmet({
  crossOriginResourcePolicy: false
}))
app.use(xss())
// parse JSON bodies
// capture raw body so we can log malformed JSON when parsing fails
app.use(bodyParser.json({
  limit: '10mb',
  verify: (req, res, buf) => {
    // attach the raw body buffer for later debugging
    req.rawBody = buf.toString('utf8')
  }
}))
// also parse URL-encoded bodies (from forms or axios when not sending JSON)
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
app.use(authRoute)
app.use(userRoute)
app.use(recipeRoute)
app.use(express.static('public'))
const serverPort = process.env.SERVER_PORT || 3001

;(async () => {
  await cache.init()
  app.listen(serverPort, () => {
    console.log(`Service running on port ${serverPort}`)
  })
})()

// error handling middleware for bodyParser JSON parse errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', err && err.stack)
})

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection at:', reason)
})

// express error handler to catch JSON parse errors and return a 400
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    // log the raw body for debugging (avoid logging in production)
    console.error('JSON parse error, raw body:', req.rawBody)
    return res.status(400).json({
      code: 400,
      status: 'failed',
      message: 'Invalid JSON payload',
      error: err.message
    })
  }
  // pass through other errors
  next(err)
})
