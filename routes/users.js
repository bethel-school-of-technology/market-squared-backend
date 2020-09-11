var express = require('express');
var router = express.Router();
var models = require('../models');
const mysq2 = require('mysql2')
var authService = require('../services/auth');

//trying to pull all users and associate their posts with them to pull into the homepage cards. Still working on this
router.get('/', function (req, res, next) {
  models.users.findAll(
    //   {include: [
    //     { model: models.posts, where: { user_id: user_id.user_id } }
    // ]}
  ).then(user =>{
    res.json(user)
  })
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
*/

module.exports = router;