# backend-slicing-foodtemplate

## Installation

1. Clone the repo `git clone https://github.com/Alamnzr123/backend-slicing-foodtemplate/`
2. Run `npm install` to install the dependencies
3. Import database `mama_recipe` to your PostgreSQL ([Backup and Restore PostgreSQL](https://www.postgresql.org/docs/8.1/backup.html#BACKUP-DUMP-RESTORE))
4. Set the environment variables:
   - `PORT` : fill for set the API running port
   - `HOST` : fill with HOSTNAME in your postgreSQL configuration
   - `USER` : fill with USERNAME in your postgreSQL configuration
   - `DB_NAME` : fill with the DATABASE NAME or leave it filled with `mama_recipe` if you isn't rename the database
   - `PASSWORD` : fill with PASSWORD in your postgreSQL configuration
   - `SERVER_PORT` : fill with PORT in your postgreSQL configuration
   - `JWT_SECRET` : fill with JWT key configuration
5. Run with :
   - `npm run start` : if you want to run it in client mode (use `node`) without auto restart on every changing code
   - `npm run dev` : if you want to run it in developer mode (use `nodemon`) every change and save it will auto restart
6. You are Ready to Go

## Table of contents

- [Features](#Features)
- [Commands](#Commands)
- [Environment Variables](#Environment-Variables)
- [Project Structure](#Project-Structure)
- [API Documentation](#API-Documentation)
- [Packages Included](#Packages Included)
- [Tools and Technologies](#Tools and Technologies)

## Features

- **SQL database:** using [PostgreSQL](https://www.postgresql.org/)
- **API documentation:** with [Postman](https://www.postman.com/)
- **Dependency management:** with [NPM](https://www.npmjs.com/)
- **Environment variables:** using [dotenv](https://github.com/motdotla/dotenv)
- **Security:** set security HTTP headers using [helmet](https://helmetjs.github.io/)
- **Santizing:** sanitize request data against xss and query injection
- **CORS:** Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Hash Password:** using [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Linting:** with [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/)
- **CRUD:** with [ReactJS](https://reactjs.org/) and [ExpressJS](https://expressjs.com/)
- **JSON Web Token:** using [JWT](https://jwt.io/)

## Commands

Running in client mode:

```
npm run start
```

Running in developer mode:

```
npm run dev
```

Testing:

```
npm run test
```

# backend-slicing-foodtemplate

This repository is a small Express + PostgreSQL backend for recipe management. The README below has been updated to reflect recent maintenance and improvements made to the project.

Summary of recent changes

- Upgraded multiple dependencies to remove deprecated/unsafe versions and lower advisories (e.g., bcrypt, dotenv, helmet, pg, etc.).
- Upgraded major libraries where needed for security fixes (jsonwebtoken -> v9, multer -> v2, nodemailer -> v7). I adjusted JWT usage to explicitly require HS256 and wrapped signing in a Promise.
- Added a resilient cache module: `src/config/cache.js` — prefers Redis (when REDIS_URL is set) and falls back to an in-memory Map when Redis is unavailable.
- Integrated caching for recipes: list endpoints cached for 60s and recipe detail cached for 300s; cache invalidation implemented on create/update/delete.
- Added an API Gateway: `gateway.js` using `http-proxy-middleware` that proxies `/api/*` to the backend (default gateway port 4000).
- Added Docker support: `Dockerfile` and `docker-compose.yml` (Postgres + Redis + app) for local development.
- Ran ESLint fixes and cleaned up a number of style issues.
- Removed duplicate source files in `src/models` and `src/router` (kept the canonical filenames used by the code).

Quick start (dev)

1. Clone the repo

   git clone https://github.com/Alamnzr123/backend-slicing-foodtemplate.git

2. Install dependencies (PowerShell recommended on Windows):

```powershell
Set-Location -Path 'F:\backend-slicing-foodtemplate'
npm install --legacy-peer-deps
```

3. Create `.env` (example):

```
SERVER_PORT=3001
HOST=localhost
USER=postgres
PASSWORD=postgres
DB_NAME=mama_recipe
DB_PORT=5432
JWT_SECRET=your_jwt_secret
# Optional Redis URL (when set, cache will use Redis)
REDIS_URL=redis://localhost:6379
```

4. Start the backend only:

```powershell
npm run start:backend
```

5. Start the gateway (or run both):

```powershell
npm run start:gateway
# or run both in one terminal
npm run docker-start
```

Notes about Docker

- Build + run using docker-compose (recommended for local development with DB + Redis):

```powershell
docker-compose up --build
```

The compose file provisions:

- Postgres (5432) with a database named `mama_recipe`
- Redis (6379)
- The app (backend on 3001, gateway on 4000)

Cache behavior and integration

- The app exposes a small cache utility at `src/config/cache.js` with API: init(), get(key), set(key, value, ttlSeconds), del(key), invalidate(prefix).
- Set `REDIS_URL` in the environment to use Redis. If not set, the module logs a warning and uses an in-memory Map (non-persistent, local only).
- Recipes caching: list endpoint cached 60s, detail cached 300s. On recipe create/update/delete the cache prefix `recipes:` is invalidated.

Gateway behavior

- `gateway.js` proxies `/api/*` to the backend at http://localhost:3001 by default. The gateway listens on port 4000 (configurable via GATEWAY_PORT env var).

Important upgrade notes and potential breaking changes

- jsonwebtoken v9: I updated calls to explicitly specify algorithms (HS256). If you previously relied on older default behavior, review `src/helper/generateToken.js` and `src/middleware/jwtAuth.js` changes.
- multer v2: API changes exist between multer v1 and v2. I kept your existing middleware working where possible, but please test file uploads in staging to ensure behavior remains correct.
- nodemailer v7: this is a major bump; if you use any email-sending flows, test them.

Linting and code cleanup

- I ran ESLint and applied auto-fixes; I also manually fixed several files to meet the project's style rules.

Removed duplicates

- Removed redundant files in `src/models/` (kept canonical `*.model.js` files) and removed an unused router `src/router/user.router.js`.

Scripts (use from project root)

- `npm run start` — starts backend with nodemon (dev)
- `npm run start:backend` — starts backend (node)
- `npm run start:gateway` — starts gateway (node)
- `npm run docker-start` — runs backend and gateway concurrently

Testing and verification

- After starting the services, use Postman or curl to test endpoints. The gateway proxies `/api/*` to the backend, so a request to `http://localhost:4000/api/list/recipe` will be forwarded to `http://localhost:3001/list/recipe`.

Changelog (high level)

- Dependency upgrades (security): bcrypt, dotenv, helmet, pg, jsonwebtoken, multer, nodemailer, nodemon, and others.
- Security fixes applied via `npm audit` and selective major upgrades where required.
- Added `src/config/cache.js`, `gateway.js`, `Dockerfile`, and `docker-compose.yml`.
- ESLint fixes and duplicate file removal.
