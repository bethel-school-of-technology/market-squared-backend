'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "posts", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-08-12T20:06:17.182Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "posts",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "content": {
                    "type": Sequelize.STRING,
                    "field": "content"
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
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "user_id": {
                    "type": Sequelize.INTEGER,
                    "field": "user_id"
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
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username"
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
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
