router.get('/profile', function (req, res, next) {
    let token = req.headers["jwt"];
    console.log(token)
    if (token) {
        authService.verifyUser(token).then(user => {
            if (user) {
                // insert code here
            }
        });
    } else {
        res.status(401);
        res.send('Must be logged in');
    }
});