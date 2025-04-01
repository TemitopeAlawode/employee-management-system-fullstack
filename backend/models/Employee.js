/* eslint-disable no-undef */
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Employee = sequelize.define("Employee", {
    // Defining the fields/columns
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
    },
    profilepic: {
        // type: DataTypes.STRING,
        type: DataTypes.BLOB('long'),
        allowNull: true
  },
    fullname: {
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
    phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     len:[1, 11] 
        // }
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    empdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// specifying that Employee has an associate or a relationship
// Employee.associate = (models) => {
//   Employee.hasMany(models.User);
// }; 

module.exports = Employee;




