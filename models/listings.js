'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.listings.belongsToMany(models.user, {through: 'users_listings'})
      models.listings.hasMany(models.comments)
    }
  }
  listings.init({
    userId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    price: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'listings',
  });
  return listings;
};