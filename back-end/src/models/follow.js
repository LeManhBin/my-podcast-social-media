"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follow.belongsTo(models.User, {
        foreignKey: "follower",
        as: "followerUser",
      });
      Follow.belongsTo(models.User, {
        foreignKey: "following",
        as: "followingUser",
      });
    }
  }
  Follow.init(
    {
      userId: DataTypes.INTEGER,
      follower: DataTypes.INTEGER,
      following: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Follow",
    }
  );
  return Follow;
};
