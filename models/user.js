'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "First name can not be empty" },
        notNull: { msg: "First name can not be null" }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM(["male", "female", "other"]),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Gender can not be empty" },
        notNull: { msg: "Gender can not be null" },
        isIn: {
          args: ["male", "female", "other"],
          msg: "gender must be male,female or others"

        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "please enter a valid email" },
        notEmpty: { msg: "Email can not be empty" },
        notNull: { msg: "Email can not be null" },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "password can not be empty" },
        notNull: { msg: "password can not be null" },
        isValidPassword(value) {
          // Check length
          if (value.length < 8 || value.length > 15) {
            throw new Error('Password must be between 8 and 15 characters long.');
          }
          // Check for at least one uppercase letter
          if (!/[A-Z]/.test(value)) {
            throw new Error('Password must contain at least one uppercase letter.');
          }
          // Check for at least one lowercase letter
          if (!/[a-z]/.test(value)) {
            throw new Error('Password must contain at least one lowercase letter.');
          }
          // Check for at least one number
          if (!/\d/.test(value)) {
            throw new Error('Password must contain at least one number.');
          }
          // Check for at least one special character
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            throw new Error('Password must contain at least one special character.');
          }
        }
      }
    },

    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: {
          args: [6, 6],
          msg: "OTP must be 6 char long"
        }
      }
    },
    status: {
      type: DataTypes.ENUM(["active", "inactive"]),
      allowNull: false,
      defaultValue: "active"
    },

    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Mobile Number can not be empty" },
        notNull: { msg: "Mobile number can not be null" },
        len: {
          args: [10, 10],
          msg: "Mobile number must be 10 char long"
        }
      }
    },

    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    profile_picture: DataTypes.INTEGER,
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'user',
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    deletedAt: "deleted_at",
  });
  // Adding the `beforeCreate` hook directly to the model
  user.beforeCreate(async (user, options) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });
  return user;
};