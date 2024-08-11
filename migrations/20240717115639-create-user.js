'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull:true
      },
      gender: {
        type: Sequelize.ENUM(["male","female","other"]),
        allowNull:false
      },
      email:{
        type: Sequelize.STRING,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      otp:{
        type:Sequelize.INTEGER,
        allowNull:true
      },
      mobile:{
          type:Sequelize.STRING,
          allowNull:false
      },
      profile_picture:{
        type:Sequelize.INTEGER,
        allowNull:true,
        defaultValue:null,
        references:{
          model:"media",
          key:"id"
        }
      },
      status:{
        type:Sequelize.ENUM(["active","inactive"]),
        allowNull:false,
        defaultValue:"active"
      },
      is_verified:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
      },
      deleted_at:{
        type:Sequelize.DATE,
        allowNull:true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};