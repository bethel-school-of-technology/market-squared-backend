'use strict';
module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define('products', {
        product_id: DataTypes.INTEGER,
        seller_id: DataTypes.INTEGER,
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_type: DataTypes.STRING,
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: DataTypes.INTEGER,
        zip_code: DataTypes.INTEGER,

    }, {});
    products.associate = function (models) {
        // associations can be defined here
    };
    return products;
};