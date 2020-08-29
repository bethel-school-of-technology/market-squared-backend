'use strict';

const { STRING, INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    post_id: {
      allowNull:false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: DataTypes.STRING, 
  }, {});
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};