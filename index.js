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

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(helmet({
  crossOriginResourcePolicy: false
}))
app.use(xss())
app.use(bodyParser.json())
app.use(authRoute)
app.use(userRoute)
app.use(recipeRoute)
app.use(express.static('public'))
const serverPort = process.env.SERVER_PORT
app.listen(serverPort, () => {
  console.log(`Service running on port ${serverPort}`)
})
