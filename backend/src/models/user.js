'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const env = require('../config/env');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,
     validate: {
       isEmail: { msg: 'Must be a valid email' },
       notEmpty: { msg: 'Email cannot be empty' },
     },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password cannot be empty' },
        len: { args: [8, 100], msg: 'Password must be between 8 and 100 characters' }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name cannot be empty' }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'UTC',
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  
  // hooks
  User.beforeCreate(async (user) => {
    // hash password
    user.password = await bcrypt.hash(user.password, env.bcrypt.saltRounds);
  });
  
  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      // hash password
      user.password = await bcrypt.hash(user.password, env.bcrypt.saltRounds);
    }
  });

  User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
  };
  
  // toJSON override
  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };
  return User;
};