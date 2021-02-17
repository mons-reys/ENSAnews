const express = require('express');
const router = express.Router();
const adminBlogController = require('../../controllers/adminBlogController');

//routes
//costume functions
//to delete a blog based on id and path 


//admin index model
router.get('/', adminBlogController.blog_index);

//create blog model
 router.get('/createBlog', adminBlogController.blog_create_get);

//comments model
router.get('/blog/details/:id', adminBlogController.blog_details);

//delete comment
router.delete('/blog/details/:id/:comment_id', adminBlogController.comment_delete);

//delete blog
router.delete('/blog/details/:id', adminBlogController.blog_delete);


//add new blog
router.post('/createBlog', adminBlogController.blog_create_post);






 module.exports = router;