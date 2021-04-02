const router = require("./api/userRoutes");

router.get('/dashboard', async (req, res)=> {
    res.render('dashboard')
});

module.exports = router;