/* eslint-disable no-undef */
const { Sequelize } = require("sequelize");

// Check if we're running on Render (or in production)
const isProduction = process.env.NODE_ENV === "production";

// Use DATABASE_URL for production (Render) and fallback to local config for development
const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Required for Render PostgreSQL
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
      }
    );

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

// Export sequelize instance
module.exports = sequelize;





//  /* eslint-disable no-undef */
// const { Sequelize } = require("sequelize");
// const config = require("./config/config");

// const sequelize = new Sequelize( process.env.DATABASE_URL || 
//   config.development.database,
//   config.development.username,
//   config.development.password,
//   {
//     host: config.development.host,
//     port: config.development.port,
//     dialect: config.development.dialect,
//   }
// );

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();

// // export sequelize
// module.exports = sequelize;



// // const { Sequelize } = require('sequelize');

// // // Option 3: Passing parameters separately (other dialects)
// // const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
// //   host: process.env.DB_HOST,
// //   port: process.env.DB_PORT,
// //   dialect:'postgres'
// // });

// // (async () => {
// // try {
// //     await sequelize.authenticate();
// //     console.log('Connection has been established successfully.');
// //   } catch (error) {
// //     console.error('Unable to connect to the database:', error);
// //   }
// // }) ()

// //   module.exports = sequelize;