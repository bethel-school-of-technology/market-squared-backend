'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
            
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
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },
    admin: DataTypes.BOOLEAN,

    createdAt: {
    type: DataTypes.DATE, 
    allowNull: false
    },
    updatedAt: {
    type: DataTypes.DATE, 
    allowNull: false
    },



    
  }, 
  {}
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};

