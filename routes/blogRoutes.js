const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const blogController = require('../controllers/blogController');


//index model
router.get('/', blogController.blog_index);

//get details model
router.get('/details/:id', blogController.blog_details);


//handle the comments
router.post('/details/:id', blogController.blog_comment_post);

router.get('/about', (req, res) =>{
    res.render('about');
});

router.get('/create', (req, res) =>{
    res.render('create');
});


 module.exports = router;