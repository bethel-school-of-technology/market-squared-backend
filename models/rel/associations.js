module.exports = function(models) {
    models.users.hasMany(models.posts, 
      { 
        foreignKey: 'user_id' 
      });
    models.posts.belongsTo(models.users,
       { 
      foreignKey: 'user_id',
     // targetKey: 'UserId'
     });
  }