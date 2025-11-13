const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

// Proxy /api to the backend running on port 3001
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: { '^/api': '' }
}))

const port = process.env.GATEWAY_PORT || 4000
app.listen(port, () => console.log(`API Gateway running on port ${port}`))
