/* eslint-disable no-undef */
const express = require('express');
// importing APIs
const {
    createUserHandler,
    getUsersHandler,
    loginUserHandler,
} = require('../controllers/userController');

// Importing Middleware for authentication/validation of tokens
const validateToken = require('../middleware/auth')

const router = express.Router();

router.post('/register', createUserHandler);
router.get('/users',validateToken, getUsersHandler);
router.post('/login', loginUserHandler);

// Exporting the routes out
module.exports = router
