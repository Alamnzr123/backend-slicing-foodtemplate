// In-memory fallback cache
const memoryCache = new Map()

let client = null
let ready = false

const init = async () => {
  const redisUrl = process.env.REDIS_URL || null
  if (!redisUrl) {
    console.log('REDIS_URL not provided — using in-memory cache')
    return
  }
  try {
    // lazy require so module doesn't throw if `redis` isn't installed locally
    const { createClient } = require('redis')
    client = createClient({ url: redisUrl })
    client.on('error', (err) => {
      console.warn('Redis client error, falling back to memory cache', err && err.message)
      client = null
      ready = false
    })
    await client.connect()
    ready = true
    console.log('Connected to Redis')
  } catch (err) {
    console.warn('Failed to connect to Redis, using in-memory cache', err && err.message)
    client = null
    ready = false
  }
}

const get = async (key) => {
  if (ready && client) {
    const value = await client.get(key)
    return value ? JSON.parse(value) : null
  }
  return memoryCache.has(key) ? memoryCache.get(key) : null
}

const set = async (key, value, ttlSeconds = null) => {
  if (ready && client) {
    const payload = JSON.stringify(value)
    if (ttlSeconds) {
      await client.setEx(key, ttlSeconds, payload)
    } else {
      await client.set(key, payload)
    }
    return true
  }
  memoryCache.set(key, value)
  return true
}

const del = async (key) => {
  if (ready && client) {
    await client.del(key)
    return true
  }
  memoryCache.delete(key)
  return true
}

module.exports = { init, get, set, del }
module.exports.invalidate = async (prefix) => {
  // delete keys by prefix
  if (!prefix) return
  try {
    if (ready && client && client.scanIterator) {
      for await (const k of client.scanIterator({ MATCH: `${prefix}*` })) {
        try { await client.del(k) } catch (e) { /* ignore */ }
      }
    } else {
      for (const k of Array.from(memoryCache.keys())) {
        if (k.startsWith(prefix)) memoryCache.delete(k)
      }
    }
  } catch (err) {
    // swallow errors to avoid breaking normal flow
  }
}
