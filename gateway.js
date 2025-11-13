const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

// Allow CORS from frontend (configurable via GATEWAY_ALLOWED_ORIGIN)
const allowedOrigin = process.env.GATEWAY_ALLOWED_ORIGIN || '*'
app.use(cors({ origin: allowedOrigin }))
// respond to preflight requests
app.options('*', cors())

// Proxy /api to the backend running on port 3001
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: { '^/api': '' }
}))

const port = process.env.GATEWAY_PORT || 4000
app.listen(port, () => console.log(`API Gateway running on port ${port}, CORS allowed for: ${allowedOrigin}`))
