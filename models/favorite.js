'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  favorite.init({
    address: DataTypes.STRING,
    username: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    price: DataTypes.INTEGER,
    picId: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'favorite',
  });
  return favorite;
};