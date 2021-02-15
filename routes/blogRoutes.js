const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

const blogController = require('../controllers/blogController');


//index model
router.get('/', (req, res) =>{
    blogController.blog_index(Blog, 'index', req, res);
});

//get details model
router.get('/details/:id', (req, res) =>{
    blogController.blog_details('blog', req, res);
});


router.get('/about', (req, res) =>{
    res.render('about');
});

router.get('/create', (req, res) =>{
    res.render('create');
});


//handle the comments
router.post('/details/:id', (req, res) =>{
    blogController.blog_comment_post(req, res);
 });


 module.exports = router;