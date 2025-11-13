const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

// Allow CORS from frontend (configurable via GATEWAY_ALLOWED_ORIGIN)
const allowedOrigin = process.env.GATEWAY_ALLOWED_ORIGIN || '*'
app.use(cors({ origin: allowedOrigin }))
// respond to preflight requests
app.options('*', cors())

// backend target is configurable so you can run gateway/container/host combos easily:
// - If gateway runs in the same Docker network as the API service, set GATEWAY_BACKEND_TARGET=http://app:3001
// - If gateway runs in a container but the backend runs on the host (npm run), set GATEWAY_BACKEND_TARGET=http://host.docker.internal:3001
// - If both run on host, leave default http://localhost:3001
const backendTarget = process.env.GATEWAY_BACKEND_TARGET || 'http://localhost:3001'

// Proxy /api to the backend
app.use('/api', createProxyMiddleware({
  target: backendTarget,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  proxyTimeout: 300000, // 5 minutes for backend response
  timeout: 300000,
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    // If the gateway has parsed the body (e.g. express.json() or other middleware ran),
    // re-serialize it and write it to the proxied request so backend receives valid JSON.
    try {
      if (req.body && Object.keys(req.body).length) {
        const bodyData = JSON.stringify(req.body)
        proxyReq.setHeader('Content-Type', 'application/json')
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
        proxyReq.write(bodyData)
      }
    } catch (err) {
      // keep going; onError will catch proxy errors
      console.error('onProxyReq error:', err)
    }
  },
  onError: (err, req, res) => {
    console.error('Gateway proxy error:', err && err.message ? err.message : err)
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'application/json' })
    }
    res.end(JSON.stringify({ error: 'bad_gateway', message: err && err.message ? err.message : 'proxy_error' }))
  }
}))

const port = process.env.GATEWAY_PORT || 4000
app.listen(port, () => console.log(`API Gateway running on port ${port}, proxy -> ${backendTarget}, CORS allowed for: ${allowedOrigin}`))
