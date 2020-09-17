'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "posts", deps: [users]
 *
 **/

var info = {
    "revision": 1,
    "name": "initialmigration",
    "created": "2020-09-17T21:11:01.237Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "users",
            {
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id",
                    "autoIncrement": true,
                    "allowNull": false,
                    "primaryKey": true
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
                    "field": "zip_code",
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "unique": true,
                    "allowNull": false
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
                    "allowNull": false,
                    "primaryKey": true
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "user_id"
                    },
                    "field": "user_id",
                    "allowNull": false
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title",
                    "allowNull": false
                },
                "category": {
                    "type": Sequelize.STRING,
                    "field": "category",
                    "allowNull": false
                },
                "price": {
                    "type": Sequelize.INTEGER,
                    "field": "price",
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description",
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
                },
                "post_delete": {
                    "type": Sequelize.BOOLEAN,
                    "field": "post_delete",
                    "defaultValue": false
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
