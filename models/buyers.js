'use strict';
module.exports = (sequelize, DataTypes) => {
    const buyers = sequelize.define('buyers', {
        buyer_id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes. STRING,
        zip_code: DataTypes.INTEGER,
        DOB: DataTypes.DATEONLY


    }, {});
    buyers.associate = function (models) {
        // associations can be defined here
    };
    return buyers;
};