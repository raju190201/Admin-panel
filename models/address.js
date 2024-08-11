'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  address.init({
    fullName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {msg:"fullname cannot be null"},
        notEmpty:{msg:"fullname cannot be empty"},
      }
    },
    phoneNumber: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        validate:{
          notNull: {msg:"phonenumber cannot be null"},
          notEmpty:{msg:"phonenumber cannot be empty"},
        }
      }
    },
    pinCode: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        validate:{
          notNull: {msg:"pincode cannot be null"},
          notEmpty:{msg: "pincode cannot be empty"},
        }
      }
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {msg:"state cannot be null"},
        notEmpty:{msg:"state cannot be empty"},
      }
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {msg:"city cannot be null"},
        notEmpty:{msg: "city cannot be empty"},
      }
    },
    locality: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {msg:"locality cannot be null"},
        notEmpty:{msg:"locality cannot be empty"},
      }
    }
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};