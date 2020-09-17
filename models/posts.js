'use strict';
//const { STRING, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true


      //},
      //post_delete: {
      //  type: DataTypes.BOOLEAN
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // "fc just added this code in!"
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    post_delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false

    },

  },
    {}
  );
  posts.associate = function (models) {
    // associations can be defined here
  };
  return posts;
};