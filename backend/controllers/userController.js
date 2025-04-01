/* eslint-disable no-undef */
const { Op } = require("sequelize");
// Importing the model(table)
const Users = require("../models/User");
// Importing bcrypt for hashing password
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Importing config file to access jwt secret key
const config = require("../config/config");

// Creating Users APIs

// --> Create User API
// @desc Create User
// @access Public
// @route POST /auth/register
const createUserHandler = async (req, res) => {
  try {
    // defining what will be accepted
    let { username, email, password } = req.body;
    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "All fields should be string!!!" });
    }

    if (password.length < 9) {
      return res.status(400).json({
        message: "Password should be at least 9 characters",
      });
    }

    console.log("=====", username, email, password);

    // creating the hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating or adding users to the table in the database
    const users = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    // displaying the information
    res.status(201).json({
      id: users.id,
      username: users.username,
      email: users.email,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// @desc Retrieve/View all Users
// --> Get Users API
// @access Private
// @route GET /users
const getUsersHandler = async (req, res) => {
  try {
    // getting the users from the database table
    const users = await Users.findAll();
    // displaying all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// @desc Login User
// --> Login User API
// @access Public
// @route POST /auth/login
const loginUserHandler = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    // checking  the database table to there's a user with the inputted email or username
    const user = await Users.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or email",
      });
    }
    // checking if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Generating a JWT token
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exporting the APIs
module.exports = {
  createUserHandler,
  getUsersHandler,
  loginUserHandler,
};
