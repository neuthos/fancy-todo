"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helper/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email format",
          },
        },
        unique: true,
      },
      password: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      hooks: {
        beforeCreate(user, opt) {
          user.password = hash(user.password);
        },
      },
      modelName: "User",
    }
  );
  return User;
};
