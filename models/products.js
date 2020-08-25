'use strict';

const { STRING } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define('products', {
        product_id: DataTypes.INTEGER,
        seller_id: DataTypes.INTEGER,
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_type: DataTypes.STRING,
        category: DataTypes.STRING,
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: DataTypes.STRING,
        weight: DataTypes.INTEGER,
        zip_code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },


    }, {});
    products.associate = function (models) {
        // associations can be defined here
    };
    return products;
};