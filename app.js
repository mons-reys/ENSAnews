const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const Comment = require('./models/comment');


const app = express();

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

//set the ejs view engine
app.set('view engine', 'ejs');


//routes 

//handle the blogs
app.get('/', (req, res) =>{
    //-1: from the newest to the oldest
         Blog.find().sort({createdAt: -1})
        .then(result => {
            res.render('index', {blogs: result});
        }).catch(err => console.log(err));
});

app.get('/services', (req, res) =>{
    res.render('services');
});

app.get('/blog/details/:id', (req, res) =>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result =>{
            Comment.find({blogId: id})
                    .then(commentsResult =>{
                        console.log(commentsResult);
                        res.render('blog', {blog: result, comments: commentsResult});
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

 //404 middleware
 app.use((req, res) => {
    res.status(404).render('404');
})
