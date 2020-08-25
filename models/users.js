'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    user_id: {
      allowNull:false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
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
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, 
  {}
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};

