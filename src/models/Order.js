const { Sequelize, DataTypes } = require('sequelize');
const User = require('./User');
const sequelize = require('../database/connection');
const Address = require('./Address');

const Order = sequelize.define(
  'Order',
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
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
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'address_id cannot be null'
        },
        notEmpty: {
          msg: 'address_id required.'
        }
      },
      references: {
        key: 'address_id',
        model: Address
      }
    }
  },
  { freezeTableName: true, tableName: 'order' }
);

Order.belongsTo(User, {
  as: 'order_user',
  foreignKey: 'user_id',
  targetKey: 'user_id'
});
Order.belongsTo(Address, {
  as: 'order_address',
  foreignKey: 'address_id',
  targetKey: 'address_id'
});

module.exports = Order;
