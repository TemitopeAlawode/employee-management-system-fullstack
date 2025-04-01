/* eslint-disable no-undef */
const dotenv = require("dotenv"); // importing env. variables
// loads the environmental variables from the env file
dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  },
  jwtSecret: process.env.JWT_SECRET_KEY,
}
// Verify that environment variables are correctly loaded by logging them (for debugging)
console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME, process.env.DB_HOST, process.env.DB_PORT);

module.exports = config;
