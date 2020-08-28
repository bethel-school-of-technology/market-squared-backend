var express = require('express');
var router = express.Router();
const mysql2 = require('mysql2')
const mysql = require('mysql');
var models = require('../models');
var authService = require('../services/auth');
const { post } = require('./posts');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'marketsquared'
});

connection.connect(function (err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Yay! You are connected to the database!');
})

/* GET home page. */
router.get('/profile', function (req, res, next) {
  models.users.findOne().then(user =>{
    res.json(user)
  })
});

// Creates a New User
router.post('/', function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        username: req.body.username
      },
      defaults: {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: authService.hashPassword(req.body.password),
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
      }
    })
    .spread(function (result, created) {
      if (created) {
        //never do redirect - needs all to be in frontend SEND JSON EVERYTIME
        res.json('User successfully created');
      } else {
        res.json('This user already exists');
      }
    });
});

//Create Post UNTESTED
router.post('/createPost', function (req, res, next) {
  let token = req.cookies.jwt;
  models.user
    authService.verifyUser(token).then(user => {
      if (post) {
        models.posts
          .findOrCreate({
            where: {
              user_id: user.UserId,
              post_title: req.body.PostTitle,
              description: req.body.Description,
              price: req.body.Price,
              category: req.body.Category
          }})
              .spread(function (result, created) {
              if (created) {
                res.redirect('/myposts');
              } else {
                res.send('Error. Post not created');
              }
            });
      }});
  }
  );

  //Login UNTESTED
  router.post('/login', function (req, res, next) {
    models.users.findOne({
      where: {
        username: req.body.userName
      }
    }).then(user => {
      if (!user) {
        // console.log('User not found')
        return res.status(401).json({
          message: "Login Failed"
        });
      } else {
        let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
        if (passwordMatch) {
          let token = authService.signUser(user); // <--- Uses the authService to create jwt token
          res.cookie('jwt', token); // <--- Adds token to response as a cookie
          res.send('Howdy! You have logged in!');
        } else {
          // console.log('Wrong password');
          res.send('Wrong password');
        }
      }
    });
  });

  //Pulls specific user UNTESTED
router.get('/profile/:id', function (req, res, next) {
  //  if (!req.isAuthenticated()) {
  //  return res.send('You are not authenticated');
  //  }
  if (req.params.id !== String(req.user.user_id)) {
    res.send('Login first');
  } else {
    let status;
    if (req.user.Admin) {
      status = 'Admin';
    } else {
      status = 'Normal user';
    }

    res.send('profile', {
      FirstName: req.user.FirstName,
      LastName: req.user.LastName,
      Email: req.user.Email,
      UserId: req.user.UserId,
      Username: req.user.Username,
      Status: status
    });
  }
  
});

// Display profile ONLY SHOWS USER 1
router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        models.users.findOne({
            where: { 
              user_name: user.Username 
            }
          }).then(user => {
           console.log(user)
              res.json(user);
          });
      }
    });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

module.exports = router;
