const multer = require("multer");

const storage = multer.memoryStorage(); // Store in memory since you're using BLOB

const fileUpload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB limit
});

module.exports = fileUpload;