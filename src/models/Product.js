const { DataTypes } = require('sequelize');
const Seller = require('./Seller');
const sequelize = require('../database/connection');

const Product = sequelize.define(
  'Product',
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name cannot be null'
        },
        notEmpty: {
          msg: 'name required.'
        }
      }
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'description cannot be null'
        },
        notEmpty: {
          msg: 'description required.'
        }
      }
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'category cannot be null'
        },
        notEmpty: {
          msg: 'category required.'
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'price cannot be null'
        },
        notEmpty: {
          msg: 'price required.'
        },
        isFloat: {
          msg: 'price must be integer or float'
        }
      }
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'seller_id required'
        }
      },
      references: {
        key: 'seller_id',
        model: Seller
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
    tableName: 'product'
  }
);

Product.belongsTo(Seller, {
  as: 'seller',
  foreignKey: 'seller_id',
  targetKey: 'seller_id'
});

module.exports = Product;
