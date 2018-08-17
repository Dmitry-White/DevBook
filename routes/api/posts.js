const express = require('express');
const passport = require('passport');

// Create custom router
const router = express.Router();

// Load Post model
const Post = require('../../models/Post');

// Load Input Validation
const validatePostInput = require('../../validation/post');

// Load Profile Model
const Profile = require('../../models/Profile');

// @route  GET api/posts/test
// @desc   Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));

// @route  POST api/posts
// @desc   Create post
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

// @route  GET api/posts
// @desc   Get all posts
// @access Public
router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
});

// @route  GET api/posts/:post_id
// @desc   Get a post
// @access Public
router.get('/:post_id', (req, res) => {
    Post.findById(req.params.post_id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostfound: 'No post found with that ID'}));
});

// @route  DELETE api/posts/:post_id
// @desc   Delete a post
// @access Private
router.delete('/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    // Check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: 'User not authorized' });
                    }

                    // Delete
                    post.remove()
                        .then(() => res.json({ success: true }))
                        .catch(err => res.status(404).json({postnotfound: 'Post not found'}))
                })
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));
});

// @route  POST api/posts/like/:post_id
// @desc   Like a post
// @access Private
router.post('/like/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {

                    if (
                        post.likes
                            .filter(like => like.user.toString() === req.user.id)
                            .length > 0
                    ) return res.status(400).json({ alreadyliked: 'User already liked this post' });

                    // Add user ID to likes array
                    post.likes.unshift({ user: req.user.id });

                    post.save()
                        .then(post => res.json(post))
                        .catch(err => res.status(404).json({postnotfound: 'Post not found'}));

                })
                .catch(err => res.status(404).json(err))
        })
        .catch(err => res.status(404).json(err));
});

// @route  POST api/posts/unlike/:post_id
// @desc   Unlike a post
// @access Private
router.post('/unlike/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {

                    if (
                        post.likes
                            .filter(like => like.user.toString() === req.user.id)
                            .length === 0
                    ) return res.status(400).json({ notliked: 'User have not yet liked this post' });

                    // Remove user ID from likes array
                    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
                    post.likes.splice(removeIndex, 1);

                    post.save()
                        .then(post => res.json(post))
                        .catch(err => res.status(404).json({postnotfound: 'Post not found'}));

                })
                .catch(err => res.status(404).json(err))
        })
        .catch(err => res.status(404).json(err));
});

module.exports = router;