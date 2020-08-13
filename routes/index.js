var express = require('express');
var router = express.Router();
const mysql2 = require('mysql2')
const mysql = require('mysql');
var staticModels = require('../staticModels/peeps');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'bulletinboard'
});

connection.connect(function(err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Yay! You are connected to the database!');
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

//Test for frontend connection
router.get('/staticData', function (req, res, next) {

  res.send(JSON.stringify(
    staticModels.peeps
  ));
});


module.exports = router;
