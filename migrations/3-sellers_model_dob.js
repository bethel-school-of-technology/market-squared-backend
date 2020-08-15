'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "DOB" to table "sellers"
 *
 **/

var info = {
    "revision": 3,
    "name": "sellers_model_dob",
    "created": "2020-08-14T23:52:21.781Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "sellers",
        "DOB",
        {
            "type": Sequelize.DATEONLY,
            "field": "DOB"
        }
    ]
}];

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
