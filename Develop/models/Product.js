// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: 
    {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      isInt: {
        msg: "Must be an valid number with two decimal places"
      },
    },  
    stock:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      isNumeric: {msg: "Please enter a numeric value"}, 
      default: 10,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
