const router = require('express').Router();
const { User, Post, Comment } = require('../models')


//render homepage
router.get('/', async (req, res) => {

  try {
    const postData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['name'],
      }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }

});

//get any 1 post
router.get('/post/:id', async (req, res) => {
 try{
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['name']

        }
      }
    ]
});

const post = postData.get({plain: true});

res.render('single-post', {
  post, 
  logged_in: req.session.logged_in

});

 }catch (err) {
  res.status(500).json(err);
 }

});

//login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

//signup route
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');

});



module.exports = router;

