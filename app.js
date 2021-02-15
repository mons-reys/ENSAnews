const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const Comment = require('./models/comment');
const moment = require('moment');
const { render } = require('ejs');

const app = express();


//set the ejs view engine
app.set('view engine', 'ejs');

//connect to mongoDB
const dbURL = 'mongodb+srv://mons:rowrow2020@cluster0.tqs3m.mongodb.net/ensanews?retryWrites=true&w=majority';
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((result) => {
        //listen for a request 
        app.listen(3000);
    })
    .catch(err => console.log(err));



//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));




//routes
//costume functions

//to find data based on the collection and the view path
const getFromCollection = (collection, view, req, res) =>{
     //-1: from the newest to the oldest
     collection.find().sort({createdAt: -1})
     .then(result => {
         res.render(view, {blogs: result});
     }).catch(err => console.log(err));
}

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



//handle the blogs
app.get('/', (req, res) =>{
    getFromCollection(Blog, 'index', req, res);
});

app.get('/services', (req, res) =>{
    res.render('services');
});

app.get('/blog/details/:id', (req, res) =>{
    const id = req.params.id;
    //find the blog by the id 
    Blog.findById(id)
        .then(result =>{
            //fetch the comments 
            Comment.find({blogId: id}).sort({createdAt: -1})
                    .then(commentsResult =>{
                        res.render('blog', {blog: result, comments: commentsResult, moment });
                    })
            
        })
        .catch(err => console.log(err));
});


app.get('/about', (req, res) =>{
    res.render('about');
});

app.get('/blogs/create', (req, res) =>{
    res.render('create');
});


//handle the comments
app.post('/blog/details/:id', (req, res) =>{
    const commentToSave = {blogId: req.params.id, ...req.body}
    const comment = new Comment(commentToSave);
    comment.save()
           .then(result =>{
               res.redirect('/blog/details/' + req.params.id);
           })
           .catch(err => console.log(err));
 });

 //admin route
 app.get('/admin', (req, res) =>{
    getFromCollection(Blog, './admin/admin', req, res);
});
 app.get('/admin/createBlog', (req, res) =>{
    res.render('admin/createBlog');
});

app.get('/admin/blog/details/:id', (req, res) =>{
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
app.delete('/admin/blog/details/:id', (req, res) =>{
    deleteById('/admin', req, res);
});

//add new blog
app.post('/admin/createBlog', (req, res) =>{
    const blogToSave = req.body
    const blog = new Blog(blogToSave);
    blog.save()
           .then(result =>{
               res.redirect('/admin');
           })
           .catch(err => console.log(err));
 });


 //404 middleware
 app.use((req, res) => {
    res.status(404).render('404');
})
