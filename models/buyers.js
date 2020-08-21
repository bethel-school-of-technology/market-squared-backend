'use strict';
module.exports = (sequelize, DataTypes) => {
  const buyers = sequelize.define('buyers', {
    buyer_id: DataTypes.INTEGER,
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DOB: {
      type: DataTypes.STRING,
      allowNull: false
    }


  }, {});
  buyers.associate = function (models) {
    // associations can be defined here
  };
  return buyers;
};