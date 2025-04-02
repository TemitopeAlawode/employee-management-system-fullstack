const { execSync } = require("child_process");

console.log("Running migrations...");
try {
  execSync("npx sequelize-cli db:migrate", { stdio: "inherit" });
  console.log("Migrations completed. Starting server...");
  require("./src/server"); // Your Express app entry point
} catch (error) {
  console.error("Migration failed:", error);
  process.exit(1);
}


    // "start": "node src/server.js",
