var express = require('express');
var router = express.Router();
const mysql2 = require('mysql2')
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'UsersDB'
});

connection.connect(function (err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Yay! You are connected to the database!');
})
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });

});

module.exports = router;
