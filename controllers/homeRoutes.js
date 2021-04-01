const router = require('express').Router();
const {User, Post , Comment} = require('../models')


//render homepage
router.get('/', async (req, res) => {

try {
  const postData = await Post.findAll({
    include: [{
      model: User,
      attributes: ['name'],
    }],
  });
  const posts = postData.map ((post) => post.get ({plain: true}));

  res.render ('homepage', {
    posts,
    logged_in: req.session.logged_in
  })
} catch (err) {
  res.status(500).json(err);
}

});

//

module.exports = router;
