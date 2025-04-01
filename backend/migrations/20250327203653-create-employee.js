/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
        id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4, // Or DataTypes.UUIDV1
                primaryKey: true,
            },
            profilepic: {
                // type: Sequelize.STRING,
                type: Sequelize.BLOB('long'),
                allowNull: true
          },
            fullname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            phonenumber: {
                type: Sequelize.STRING,
                allowNull: false,
                // validate: {
                //     len:[1, 11] 
                // }
            },
            position: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            empdate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            createdAt: {
              type: Sequelize.DATE,
              defaultValue: Sequelize.NOW,
            },
            updatedAt: {
              type: Sequelize.DATE,
              defaultValue: Sequelize.NOW,
            },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('Employees');
  }
};
