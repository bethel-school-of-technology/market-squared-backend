let models = require('../models');
let express = require('express');
let router = express.Router();


/* GET ALL */
router.get('/', function(req, res, next) {
  models.posts.findAll().then(posts =>{
    res.json(posts)
  })
    //res.render('index', { title: 'Express' });

});

/* GET ONE */
router.get('/:id', function(req, res, next) {
    models.posts.findByPk(parseInt(req.params.id)).then(post =>{
      res.json(post)
    })
  });

  /* CREATE */
router.post('/', function(req, res, next) {

    models.posts.create(req.body).then(() =>{
      res.json({message: 'Created post!'})  
    })
});

/* UPDATE */
router.put('/:id', function(req, res, next) {
    res.send("Update");
});

/* DELETE */
router.delete('/:id', function(req, res, next) {
    res.send("Delete");
});

module.exports = router;

