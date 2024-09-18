const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const bcrypt = require('bcrypt');

const Seller = sequelize.define(
  'Seller',
  {
    seller_id: {
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
    lastname: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'lastname cannot be null'
        },
        notEmpty: {
          msg: 'lastname required.'
        }
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email cannot be null'
        },
        notEmpty: {
          msg: 'email required.'
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password cannot be null'
        },
        notEmpty: {
          msg: 'password required.'
        }
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
    tableName: 'seller'
  }
);

Seller.beforeCreate(async (user) => {
  const generatedSalt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(user.password, generatedSalt);
  user.password = hashedPassword;
});

module.exports = Seller;
