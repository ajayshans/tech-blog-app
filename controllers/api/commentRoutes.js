const router = require('express').Router();
// Import Comment model
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Request to create a new comment with the user_id obtained from the session
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Request to delete an existing comment by id (id in comment table) amd user_id from sessoin
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Request to update an existing comment by id (id in comment table) and user_id from session
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(
            {
                ...req.body,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                }
            }
        );

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
          }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;