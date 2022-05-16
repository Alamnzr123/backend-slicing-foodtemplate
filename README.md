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

Linting:

```
npm run lint -- --fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```
# Port number
PORT=3001

# Setting PostgreSQL
PGHOST='YOUR HOST'
PGUSER='YOUR USERNAME'
PGDATABASE='YOUR DATABASE'
PGPASSWORD='YOUR PASSWORD'
PGPORT=5432

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
```

## Project Structure

```
|── Backend
   |── public          # Asset Public
   |── src             # Project source code
       |── config      # Configuration database
       |── controllers # Route controller
       |── helpers     # Helpers
       |── middleware  # Custom express middleware
       |── models      # Models
       |── router      # Routes
   |── .env            # Setup environment
   |── .eslintrc.json  # ESlint
   |── .gitignore      # File name for not uploaded on github
   ├── index.js        # App entry point
   |── mama_recipe.sql # Database
```

## API Documentation

### API Endpoints - Backend

List of available routes:

**Auth Route**\
`POST /register` - register\
`POST /login` - login\

**User Route**\
`GET /list/user` - get all users\
`GET /detail/user/:id` - get user by id\
`PUT /edit/user/:id` - change user profile\
`DELETE /delete/user/:id` - delete user by id

**Recipe Route**\
`GET /show/myrecipe` - get your own recipes\
`GET /list/recipe` - get all recipe\
`POST /insert/recipe` - create new recipe\
`PUT /edit/recipe/:id` - update recipe by id\
`DELETE /delete/recipe/:id` - delete recipe by id

### API Endpoints - Frontend

List of available routes:

`PATH /` - Access Home Page\
`PATH /register` - Access Register Page\
`PATH /forgotpass` - Access Forgot Password Page\
`PATH /resetpass` - Access Reset Password Page\
`PATH /videorecipe` - Access Video Recipe Page\
`PATH /resetpasscode` - Access Reset Password Code Page\
`PATH /profile` - Access Profile Page\
`PATH /changeprofile` - Access Change Profile Page\
`PATH /login` - Access Login Page\
`PATH /addrecipe` - Access Add Recipe Page\
`PATH /editrecipe/:id` - Access Edit Recipe Page\
`PATH /recipedetail` - Access Recipe Detail Page\

```

## Tools and Technologies
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
```

## Packages Included

- NPM dependencies

  ![](https://img.shields.io/badge/bcrypt-v5.0.1-blue)
  ![](https://img.shields.io/badge/body--parser-v1.19.2-blue)
  ![](https://img.shields.io/badge/cors-v2.8.5-blue)
  ![](https://img.shields.io/badge/dotenv-v16.0.0-blue)
  ![](https://img.shields.io/badge/express-v4.17.3-blue)
  ![](https://img.shields.io/badge/express--validator-v5.3.1-blue)
  ![](https://img.shields.io/badge/helmet-v5.0.2-blue)
  ![](https://img.shields.io/badge/pg-v8.7.3-blue)
  ![](https://img.shields.io/badge/multer-v1.4.4-blue)
  ![](https://img.shields.io/badge/xss--clean-v0.1.1-blue)
  ![](https://img.shields.io/badge/jsonwebtoken-v8.5.1-blue)
  ![](https://img.shields.io/badge/sweetalert-v2.1.2-blue)
  ![](https://img.shields.io/badge/reactstrap-v9.0.2-blue)
  ![](https://img.shields.io/badge/react-router-dom-v6.3.0-blue)
  ![](https://img.shields.io/badge/react-dom-v17.0.2-blue)
  ![](https://img.shields.io/badge/react-v17.0.2-blue)
  ![](https://img.shields.io/badge/jwt-decode-v3.1.2-blue)
  ![](https://img.shields.io/badge/axios-v0.26.1-blue)
  ![](https://img.shields.io/badge/bootstrap-v5.1.3-blue)
