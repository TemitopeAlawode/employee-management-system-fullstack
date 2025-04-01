/* eslint-disable no-undef */
const express = require('express')
const fileUpload = require("../config/multerConfig"); // for file upload

// importing the controllers
const {
    createEmployeeHandler,
    getEmployeesHandler,
    getEmployeeHandler,
    updateEmployeeHandler,
    deleteEmployeeHandler
} = require('../controllers/employeeController')

// Importing Middleware for authentication/validation of tokens
const validateToken = require('../middleware/auth')

// defining router
const router = express.Router();

router.post('/add-employee', validateToken, fileUpload.single('profilepic'), createEmployeeHandler);
router.get('', validateToken, getEmployeesHandler)
router.get('/:id', validateToken, getEmployeeHandler)
router.put('/:id', validateToken, fileUpload.single('profilepic'), updateEmployeeHandler)
router.delete('/:id',validateToken, deleteEmployeeHandler)

// exporting router
module.exports = router