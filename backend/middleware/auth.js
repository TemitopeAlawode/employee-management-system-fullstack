/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
// Importing the User model(table)
const Users = require("../models/User");
// Importing config file to access jwt secret key
const config = require('../config/config');

const validateToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: 'Authorization header is required',
            })
        }
        const token = req.headers.authorization.split(' ')[1]; // to remove the 'Bearer' keyword and display only the token
         if (!token) {
            return res.status(401).json({
                message: 'Invalid Token',
            });
         }

         const payload = jwt.verify(token, config.jwtSecret);
         if (!payload) {
            return res.status(401).json({
                message: 'Invalid Token',
            });
         }

         const user = await Users.findByPk(payload.id);
         if (!user) {
            return res.status(401).json({
                message: 'Error fetching the user',
            });
         }

         // whatever API this middleware is put on inside that API you'll have access to the full user object or details 
        //  the logged in user info is stored here...
         req.user = user;
         next();

    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}

module.exports = validateToken;


