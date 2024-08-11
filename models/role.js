'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  role.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {msg:"Role name cannot be null"},
        notEmpty:{msg:"Role name cannot be empty"},
        len:{
          args:[2,20],
          msg:"Role name must be between 2 to 20 char long"
        }

      }
      
    },
    discription:{
      type: DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull: {msg:"Role discription cannot be null"},
        notEmpty:{msg:"Role discription cannot be empty"}
      }

    },
    Slug: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {msg:"Role slug cannot be null"},
        notEmpty:{msg:"Role slug cannot be empty"},
    }}
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};