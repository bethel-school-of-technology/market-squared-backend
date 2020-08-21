var express = require('express');
var router = express.Router();
var models = require('../models');
const mysq2 = require('mysql2')
var authService = require('../services/auth');


//CHANGE HBS VIEW - UNTESTED
router.get('/', function (req, res, next) {
  // models.users.findAll().then(user =>{
  //   res.json(user)
  // })
  let user = {
    name: 'Frodo Baggins',
    username: 'username',
    email: 'user@user.com'
  }
  res.json({
    message: 'Successful',
    status: 200,
    user
  })
});

//CHANGE HBS VIEW - UNTESTED
router.get('/signup', function (req, res, next) {
  res.render('signup');
});

//WORKS
// Create new user if one doesn't exist
router.post('/signup', function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.userName
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password)
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

// router.get('/login', function(req, res, next) {
//   res.render('login');
// });

//WORKS
// Login user and return JWT as cookie
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.userName
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

//WORKS
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logout Succeeded');
});

//WORKS
router.post('/delete/:id', function (req, res, next) {
  let userId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  authService.verifyUser(token)
    .then(user => {
      if (user) {
        console.log(user)
        models.users
          .update(
            { Deleted: true },
            {
              where: { UserId: userId }
            }
          )
          .then(res.send('successfully deleted'));
      }
      else res.send('CRAP')
    })
});

/*CHANGE HBS VIEW - UNTESTED
router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        models.users.findOne({
            where: { 
              Username: user.Username 
            },
            include: [{
              model: models.posts,
              where: { Deleted: false },
              required: false
            }]
          }).then(userpostsFound => {
           // console.log(userpostsFound)
              res.render('profile', {
                userData: userpostsFound
              });
          });
      }
    });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

router.get('/admin', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user.Admin) {
        models.users
          .findAll({ where: { Deleted: false }, raw: true})
          .then(usersFound => res.render('adminView', {users:usersFound}));
            } else {
              res.send('unauthorized');
            }
          });
      } else {
        res.redirect('/users/login');
      }
    });

router.get('/admin/editUser/:id', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user && user.Admin) {
        models.users
        .findByPk(parseInt(req.params.id))
          .then(foundUser => {
            if (foundUser) {
              res.render('editUser', {
                FirstName: foundUser.FirstName,
                LastName: foundUser.LastName,
                Email: foundUser.Email,
                Username: foundUser.Username,
                UserId: foundUser.UserId
              });
            } else {
              res.send('User not found');
            }
          });
      } else {
        res.redirect('/users/login');
      }
    });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

router.get('/profile/:id', function (req, res, next) {
  //  if (!req.isAuthenticated()) {
  //  return res.send('You are not authenticated');
  //  }
  if (req.params.id !== String(req.user.UserId)) {
    res.send('This is not your profile');
  } else {
    let status;
    if (req.user.Admin) {
      status = 'Admin';
    } else {
      status = 'Normal user';
    }

    res.render('profile', {
      FirstName: req.user.FirstName,
      LastName: req.user.LastName,
      Email: req.user.Email,
      UserId: req.user.UserId,
      Username: req.user.Username,
      Status: status
    });
  }
});
*/
module.exports = router;