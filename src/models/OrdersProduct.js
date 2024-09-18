const { Sequelize, DataTypes } = require('sequelize');
const Product = require('./Product');
const Order = require('./Order');
const sequelize = require('../database/connection');

const OrderProduct = sequelize.define(
  'OrderProduct',
  {
    orders_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'order_id cannot be null'
        },
        notEmpty: {
          msg: 'order_id required.'
        }
      },
      references: {
        key: 'order_id',
        model: Order
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'product_id cannot be null'
        },
        notEmpty: {
          msg: 'product_id required.'
        }
      },
      references: {
        key: 'product_id',
        model: Product
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    tableName: 'orders_product'
  }
);

OrderProduct.belongsTo(Order, {
  as: 'order_detail',
  foreignKey: 'order_id',
  targetKey: 'order_id'
});
OrderProduct.belongsTo(Product, {
  as: 'product_detail',
  foreignKey: 'product_id',
  targetKey: 'product_id'
});

module.exports = OrderProduct;
