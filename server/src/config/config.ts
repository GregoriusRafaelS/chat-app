import dotenv from "dotenv"
dotenv.config();

const env = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_Name,
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_Name,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": process.env.DB_URL,
    "dialect": "mysql"
  }
}

module.exports = env