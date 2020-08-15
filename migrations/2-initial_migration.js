'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "buyers", deps: []
 * createTable "products", deps: []
 * createTable "sellers", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "initial_migration",
    "created": "2020-08-13T19:31:44.661Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "buyers",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "buyer_id": {
                    "type": Sequelize.INTEGER,
                    "field": "buyer_id"
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username"
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name"
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "address": {
                    "type": Sequelize.STRING,
                    "field": "address"
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city"
                },
                "state": {
                    "type": Sequelize.STRING,
                    "field": "state"
                },
                "zip_code": {
                    "type": Sequelize.INTEGER,
                    "field": "zip_code"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "products",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "product_id": {
                    "type": Sequelize.INTEGER,
                    "field": "product_id"
                },
                "seller_id": {
                    "type": Sequelize.INTEGER,
                    "field": "seller_id"
                },
                "product_name": {
                    "type": Sequelize.STRING,
                    "field": "product_name"
                },
                "product_type": {
                    "type": Sequelize.STRING,
                    "field": "product_type"
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price"
                },
                "weight": {
                    "type": Sequelize.INTEGER,
                    "field": "weight"
                },
                "zip_code": {
                    "type": Sequelize.INTEGER,
                    "field": "zip_code"
                },
                "test": {
                    "type": Sequelize.STRING,
                    "field": "test"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "sellers",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "seller_id": {
                    "type": Sequelize.INTEGER,
                    "field": "seller_id"
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username"
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name"
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email"
                },
                "address": {
                    "type": Sequelize.STRING,
                    "field": "address"
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city"
                },
                "state": {
                    "type": Sequelize.STRING,
                    "field": "state"
                },
                "zip_code": {
                    "type": Sequelize.INTEGER,
                    "field": "zip_code"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
