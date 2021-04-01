const router = require("./api/userRoutes");

router.get('/dashboard', async (req, res)=> {
    res.render('login')
});

module.exports = router;