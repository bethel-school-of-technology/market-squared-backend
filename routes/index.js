var express = require('express');
var router = express.Router();
const mysql2 = require('mysql2')
const mysql = require('mysql');
var models = require('../models');
var authService = require('../services/auth');

//Gets all posts into home page and asscociates them with their user
// look into this route
router.get('/posts', function (req, res, next) {
  models.posts.findAll({ include: models.users , where: { post_delete: false }}).then(post => {
    res.json(post)
  })
});

router.get('/myposts', function (req, res, next) {
  models.posts.findAll(
    { include: models.users , where: { post_delete: false }}
  ).then(post => {
    res.json(post)
  })
});

router.get('/myposts/:id', function (req, res, next) {
  models.users.findByPk(parseInt(req.params.id), { include: models.posts, where: {post_delete: false} })
    .then(post => {
      console.log(post)
      res.json(post)
    })
});


router.get('/post/:id', function (req, res, next) {
  models.posts.findByPk(parseInt(req.params.id), { include: models.users })
    .then(post => {
      console.log(post)
      res.json(post)
    })
});


// IS THIS STILL BEING USED?
router.get('/profile', function (req, res, next) {
  let token = req.headers["jwt"];
  console.log(token)
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        models.users.findOne({
          where: {
            username: user.username
          }
        }).then(user => {
          res.json(user);
        });
      }
    });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});


// Login user and return JWT token
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      //  console.log('User not found')
      return res.status(401).json({
        message: "User Login Failed"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.password);
      if (passwordMatch) {
        let token = authService.signUser(user); // <--- Uses the authService to create jwt token
        res.setHeader('jwt', token); // <--- Adds token to response as a header
        res.json({ token });
      } else {
        // console.log('Wrong password');
        res.json('Wrong password');
      }
    }
  });
});


// Creates a New User
router.post('/', function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        username: req.body.username
      },
      defaults: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: authService.hashPassword(req.body.password),
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
      }
    })
    .spread(function (result, created) {
      if (created, result) {
        res.json(result);
      } else {
        res.json('This user already exists');
      }
    });
});


router.post('/create/:id', function (req, res, next) {
  let userId = parseInt(req.params.id);
  models.posts
  .findOrCreate({
    where:{
      user_id: userId,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price
    }
  })
  .spread(function (result, created) {
    if(created, result) {
      res.json(result);
    }else{
      res.json('There was a problem with your post.');
    }
  });
});

/*/Create Post?
router.post('/create', function (req, res, next) {
  let token = req.headers["jwt"];
  console.log(token)
  if (token) {
      authService.verifyUser(token).then(user => {
          if (user) {
            console.log(user)
            models.posts
            .findOrCreate({
              where: {
                
                title: req.body.title,
                
              },
              defaults: {
                user_id: user.user_id,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category
              }
            })
            .spread(function (result, created) {
              if (created) {
                res.send(result);
              } else {
                res.send('Error. Post not created');
              }
            });
          }
      });
  } else {
      res.status(401);
      res.send('Must be logged in');
  }
});*/




//Get User Information
router.get('/profile/:id', function (req, res, next) {
  models.users.findByPk(parseInt(req.params.id))
    .then(user => {
      res.json(user);
    })
});

// Get post information for edit
router.get('/editpost/:id', function (req, res, next) {
  models.posts.findByPk(parseInt(req.params.id))
    .then(post => {
      res.json(post);
    })
});

// Update User
router.put("/profile/:id", function (req, res, next) {
  let userId = parseInt(req.params.id);
  models.users
    .update(req.body, { where: { user_id: userId } })
    .then(result => res.json('/profile/' + userId))
    .catch(err => {
      res.status(400);
      res.send("There was a problem updating the user.  Please check the user information.");
    });
});

// Logout User
router.get('/logout', function (req, res, next) {
  localStorage.clear();
  res.send('Logout Succeeded');
});


// Update Post
router.put("/editpost/:id", function (req, res, next) {
  let postId = parseInt(req.params.id);
  models.posts
    .update(req.body, { where: { post_id: postId } })
    .then(result => res.json('/editpost/' + postId))
    .catch(err => {
      res.status(400);
      res.send("There was a problem updating the post.  Please check the post information.");
    });
});

//Delete
router.delete('/myposts/:id', function(req, res, next) {
  let postId = parseInt(req.params.id);
  models.posts
  .update(
      { post_delete: true },
      {
        where: { post_id: postId }
      }
    )
    .then(result => res.json(result))
    .catch(err => {
      res.status(400);
      res.send("There was a problem deleting the post.");
    });
});


module.exports = router;







//////////////////////// UNUSED STUFF ////////////////////////

//Associations for routes
/* models.users.hasMany(models.posts,
  {
    foreignKey: 'user_id'
  });
models.posts.belongsTo(models.users,
  {
    foreignKey: 'user_id',
  });

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
}) */

/* //Create Post Works! Needs user asscociations to append user id properly
router.post('/create', function (req, res, next) {
  //let token = req.cookies.jwt;
  // models.user
  // authService.verifyUser(token).then(user => {
  // if (post) {
  models.posts
    .findOrCreate({
      where: {
        // user_id: user.UserId,
        user_id: req.body.UserId,
        title: req.body.PostTitle,
        description: req.body.Description,
        price: req.body.Price,
        category: req.body.Category
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.send('created');
      } else {
        res.send('Error. Post not created');
      }
    });
  //   }});
}
);
 */

/*Create Post 
router.post('/create', function (req, res, next) {
  models.posts
    .findOrCreate({
      where: {
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.send(result);
      } else {
        res.send('Error. Post not created');
      }
    });
}
); */

/* Update User - OLD
router.put("/profile/:id", function (req, res, next) {
  let userId = parseInt(req.params.id);
  models.users
    .update(req.body, { where: { user_id: userId } })
    .then(result => res.redirect('/profile/' + userId))
    .catch(err => {
      res.status(400);
      res.send("There was a problem updating the user.  Please check the user information.");
    });
});*/