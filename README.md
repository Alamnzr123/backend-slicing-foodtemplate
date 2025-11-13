# backend-slicing-foodtemplate

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

## Database initialization & ensuring schema

The project includes a SQL dump `mama_recipe.sql` (located at the repository root) which defines the tables used by the application (users, recipes, comments, saved_recipes, liked_recipes, etc.). The Docker Compose configuration now mounts this file into Postgres's initialization directory so a fresh database will be created with the schema automatically.

How the Docker init works

- The official Postgres Docker image runs any `*.sql` or `*.sh` files placed into `/docker-entrypoint-initdb.d/` when the Postgres data directory is empty (i.e. on first initialization of the database). This means:
  - If you start the compose stack with no existing named volume for Postgres, the SQL file will be executed and the schema created automatically.
  - If the Postgres named volume (`pgdata`) already contains a database, the init scripts will NOT run again.

Common scenarios and how to handle them

1. Fresh setup (no existing DB volume) — automatic schema apply

```powershell
# from f:\slicing-fullstack\backend-slicing-foodtemplate
docker-compose up --build -d
# The postgres container will run /docker-entrypoint-initdb.d/mama_recipe.sql
# automatically and create the database + tables. Check logs to confirm:
docker-compose logs -f postgres
```

2. You already have a pgdata volume and want to re-run the init script (force re-init)

Warning: this will permanently delete the existing database data in the named volume.

```powershell
# Stop and remove containers and named volumes declared in compose
docker-compose down -v

# Recreate (the postgres container will now initialize the DB and run the SQL file)
docker-compose up --build -d
```

3. Import the SQL into an existing running Postgres container (without removing volumes)

If you don't want to delete the existing volume, you can import the SQL manually into the running Postgres container.

```powershell
# find the postgres container name (or use the one from `docker-compose ps`)
docker-compose ps

# copy the SQL file into the container (replace <postgres_container> with the actual name)
docker cp ./mama_recipe.sql <postgres_container>:/tmp/mama_recipe.sql

# execute the SQL as the postgres user against the mama_recipe database
docker exec -u postgres -it <postgres_container> psql -U postgres -d mama_recipe -f /tmp/mama_recipe.sql
```

4. Quick checks to see whether the `users` table exists

```powershell
# list tables
docker exec -u postgres -it <postgres_container> psql -U postgres -d mama_recipe -c "\dt"

# try a simple select (will error if table doesn't exist)
docker exec -u postgres -it <postgres_container> psql -U postgres -d mama_recipe -c "select count(*) from users;"
```

Notes

- The compose file now mounts `./mama_recipe.sql` to `/docker-entrypoint-initdb.d/mama_recipe.sql`. This only affects fresh DB initialization. If you plan to use the DB persistently across restarts, do not remove the named volume unless you intend to wipe data and reinitialize.
- If you run into `relation "users" does not exist` or similar errors after bringing up the stack, check whether the Postgres volume is already present (and therefore the init script didn't run). Use the commands above to either import manually or recreate the volume.
