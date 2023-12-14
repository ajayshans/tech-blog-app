const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts and JOIN with user data displaying on homepage
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Get specific post and join with user data. Additionally get associated comments
router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });

      const commentData = await Comment.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            },
        ],
        where: { post_id: req.params.id },
      });
  
      const post = postData.get({ plain: true });
      const comments = commentData.map((post) => post.get({ plain: true }));
  
      res.render('post', {
        ...post,
        // Note: This may need to be ...comments (spread operator)
        comments,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Render addPost page
router.get('/addpost', (req, res) => {
    res.render('addPost', { logged_in: req.session.loggged_in });
})

// Render updatePost page and enable user to view and update post
router.get('/updatepost/:id', withAuth, async (req, res) => {
    try {
        // Get post by id
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!'})
        }

        const post = postData.get({ plain: true });

        res.render('updatePost', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render updateComment page and enable user to view and update comment
router.get('/updatecomment/:id', withAuth, async (req, res) => {
    try {
        // Get comment by id
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ]
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!'})
        }

        const comment = commentData.get({ plain: true });

        res.render('updatePost', {
            ...comment,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render login page if user is not logged in and redirect to dashboard otherwise
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to their dashboard
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

// Render signup page if user is not logged in and redirect to dashboard otherwise
router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to their dashboard
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('signup');
  });

module.exports = router;