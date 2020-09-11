'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "buyers"
 * dropTable "products"
 * dropTable "sellers"
 * addColumn "post_delete" to table "posts"
 * changeColumn "address" on table "users"
 * changeColumn "city" on table "users"
 * changeColumn "state" on table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "update-delete",
    "created": "2020-09-05T19:41:23.494Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "dropTable",
        params: ["buyers"]
    },
    {
        fn: "dropTable",
        params: ["products"]
    },
    {
        fn: "dropTable",
        params: ["sellers"]
    },
    {
        fn: "addColumn",
        params: [
            "posts",
            "post_delete",
            {
                "type": Sequelize.BOOLEAN,
                "field": "post_delete"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "address",
            {
                "type": Sequelize.STRING,
                "field": "address"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "city",
            {
                "type": Sequelize.STRING,
                "field": "city"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "users",
            "state",
            {
                "type": Sequelize.STRING,
                "field": "state"
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
