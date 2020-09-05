var express = require('express');
var router = express.Router();
var models = require('../models');
const mysq2 = require('mysql2')
var authService = require('../services/auth');

router.get('/', function (req, res, next) {
  models.posts.findAll().then(post =>{
    res.json(post)
  })
});

//WORKS
router.post('/delete/:id', function (req, res, next) {
  let postId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  authService.verifyUser(token)
    .then(post => {
      if (post) {
        console.log(post)
        models.posts
          .update(
            { Deleted: true },
            {
              where: { PostId: postId }
            }
          )
          .then(res.send('successfully deleted'));
      }
      else res.send('CRAP')
    })
});



module.exports = router;