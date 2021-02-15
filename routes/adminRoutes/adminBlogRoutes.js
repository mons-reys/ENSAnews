const Blog = require('../../models/blog')
const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/blogController');
const adminBlogController = require('../../controllers/adminBlogController');

//routes
//costume functions
//to delete a blog based on id and path 


//admin index model
router.get('/', (req, res) =>{
    blogController.blog_index(Blog, './admin/admin', req, res);
});

//create blog model
 router.get('/createBlog', (req, res) =>{
    adminBlogController.blog_create_get(req, res);
});

//comments model
router.get('/blog/details/:id', (req, res) =>{
    blogController.blog_details('admin/blog',req, res);
});

//delete in the index page
router.delete('/blog/details/:id', (req, res) =>{
    adminBlogController.blog_delete('/admin', req, res);
});

//add new blog
router.post('/createBlog', (req, res) =>{
    adminBlogController.blog_create_post(req, res);
 });

 module.exports = router;