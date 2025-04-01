/* eslint-disable no-undef */
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  // Defining the fields/columns
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
}, {
  timestamps: true,
});

// specifying that User has an associate or a relationship
// User.associate = (models) => {
//   User.hasMany(models.Expense);
// }; 

module.exports = User;




