const router = require("./api/userRoutes");

router.get('/login', (req, res)=> {
    res.render('login')
});

module.exports = router;