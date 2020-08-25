'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "state" from table "products"
 * removeColumn "city" from table "products"
 * removeColumn "address" from table "products"
 * addColumn "zip_code" to table "users"
 * addColumn "state" to table "users"
 * addColumn "city" to table "users"
 * addColumn "address" to table "users"
 * changeColumn "admin" on table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "initial_migration2",
    "created": "2020-08-25T19:58:10.604Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["products", "state"]
    },
    {
        fn: "removeColumn",
        params: ["products", "city"]
    },
    {
        fn: "removeColumn",
        params: ["products", "address"]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "zip_code",
            {
                "type": Sequelize.INTEGER,
                "field": "zip_code",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "state",
            {
                "type": Sequelize.STRING,
                "field": "state",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "city",
            {
                "type": Sequelize.STRING,
                "field": "city",
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "address",
            {
                "type": Sequelize.STRING,
                "field": "address",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "admin",
            {
                "type": Sequelize.BOOLEAN,
                "field": "admin"
            }
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
