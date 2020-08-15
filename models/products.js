'use strict';
module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define('products', {
        product_id: DataTypes.INTEGER,
        seller_id: DataTypes.INTEGER,
        product_name: DataTypes.STRING,
        product_type: DataTypes.STRING,
        price: DataTypes.INTEGER,
        weight: DataTypes.INTEGER,
        zip_code: DataTypes.INTEGER,
        test: DataTypes.STRING

    }, {});
    products.associate = function (models) {
        // associations can be defined here
    };
    return products;
};