'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "buyers", deps: []
 * createTable "posts", deps: []
 * createTable "products", deps: []
 * createTable "sellers", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-08-25T20:17:40.066Z",
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
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name",
                    "allowNull": false
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name",
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true,
                    "allowNull": false
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username",
                    "unique": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                "address": {
                    "type": Sequelize.STRING,
                    "field": "address",
                    "allowNull": false
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city",
                    "allowNull": false
                },
                "state": {
                    "type": Sequelize.STRING,
                    "field": "state",
                    "allowNull": false
                },
                "zip_code": {
                    "type": Sequelize.INTEGER,
                    "field": "zip_code",
                    "allowNull": false
                },
                "DOB": {
                    "type": Sequelize.STRING,
                    "field": "DOB",
                    "allowNull": false
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
            "posts",
            {
                "post_id": {
                    "type": Sequelize.INTEGER,
                    "field": "post_id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id"
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title",
                    "allowNull": false
                },
                "category": {
                    "type": Sequelize.STRING,
                    "field": "category"
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price",
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
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
                    "field": "product_name",
                    "allowNull": false
                },
                "product_type": {
                    "type": Sequelize.STRING,
                    "field": "product_type"
                },
                "category": {
                    "type": Sequelize.STRING,
                    "field": "category"
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price",
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "weight": {
                    "type": Sequelize.INTEGER,
                    "field": "weight"
                },
                "zip_code": {
                    "type": Sequelize.INTEGER,
                    "field": "zip_code",
                    "allowNull": false
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
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name",
                    "allowNull": false
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name",
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true,
                    "allowNull": false
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username",
                    "unique": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                "address": {
                    "type": Sequelize.STRING,
                    "field": "address",
                    "allowNull": false
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city",
                    "allowNull": false
                },
                "state": {
                    "type": Sequelize.STRING,
                    "field": "state",
                    "allowNull": false
                },
                "zip_code": {
                    "type": Sequelize.INTEGER,
                    "field": "zip_code",
                    "allowNull": false
                },
                "DOB": {
                    "type": Sequelize.STRING,
                    "field": "DOB",
                    "allowNull": false
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
            "users",
            {
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name",
                    "allowNull": false
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name",
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true,
                    "allowNull": false
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username",
                    "unique": true,
                    "allowNull": false
                },
                "address": {
                    "type": Sequelize.STRING,
                    "field": "address",
                    "allowNull": false
                },
                "city": {
                    "type": Sequelize.STRING,
                    "field": "city",
                    "allowNull": false
                },
                "state": {
                    "type": Sequelize.STRING,
                    "field": "state",
                    "allowNull": false
                },
                "zip_code": {
                    "type": Sequelize.INTEGER,
                    "field": "zip_code",
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "admin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "admin"
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
