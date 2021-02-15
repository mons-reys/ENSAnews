const express = require('express');
const router = express.Router();
const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const moment = require('moment');


//routes
//costume functions
//to delete a blog based on id and path 
const deleteById = (redirecPath, req, res) =>{
    const id = req.params.id;
    //find the blog by the id 
    Blog.findByIdAndDelete(id)
        .then(result =>{
            res.json({
                redirect: redirecPath
            })
        })
        .catch(err => console.log(err));
}


router.get('/', (req, res) =>{
    getFromCollection(Blog, './admin/admin', req, res);
});
 router.get('/createBlog', (req, res) =>{
    res.render('admin/createBlog');
});

router.get('/blog/details/:id', (req, res) =>{
    const id = req.params.id;
    //find the blog by the id 
    Blog.findById(id)
        .then(result =>{
            //fetch the comments 
            Comment.find({blogId: id}).sort({createdAt: -1})
                    .then(commentsResult =>{
                        res.render('./admin/blog', {blog: result, comments: commentsResult, moment });
                    })
            
        })
        .catch(err => console.log(err));
});

//delete in the index page
router.delete('/blog/details/:id', (req, res) =>{
    deleteById('/admin', req, res);
});

//add new blog
router.post('/createBlog', (req, res) =>{
    const blogToSave = req.body
    const blog = new Blog(blogToSave);
    blog.save()
           .then(result =>{
               res.redirect('/admin');
           })
           .catch(err => console.log(err));
 });

 module.exports = router;