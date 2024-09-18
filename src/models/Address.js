const { Sequelize, DataTypes } = require('sequelize');
const User = require('./User');
const sequelize = require('../database/connection');

const Address = sequelize.define(
  'Address',
  {
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'title cannot be null'
        },
        notEmpty: {
          msg: 'title required.'
        }
      }
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'desc cannot be null'
        },
        notEmpty: {
          msg: 'desc required.'
        }
      }
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'country cannot be null'
        },
        notEmpty: {
          msg: 'country required.'
        }
      }
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'city cannot be null'
        },
        notEmpty: {
          msg: 'city required.'
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'user_id cannot be null'
        },
        notEmpty: {
          msg: 'user_id required.'
        }
      },
      references: {
        key: 'user_id',
        model: User
      }
    }
  },
  {
    freezeTableName: true,
    tableName: 'address'
  }
);

module.exports = Address;
