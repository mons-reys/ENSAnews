const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const Comment = require('./models/comment');
const moment = require('moment');
const { render } = require('ejs');
const blogRouter = require('./routes/blogRoutes');
const app = express();
const adminRouter = require('./routes/adminRoutes/adminBlogRoutes');
const blogController = require('./controllers/blogController');


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









//handle the blogs
app.get('/', (req, res) =>{
    blogController.blog_index(Blog, 'index', req, res);
});

app.get('/services', (req, res) =>{
    res.render('services');
});

app.get('/about', (req, res) =>{
    res.render('about');
});

//blog router
app.use('/blog',blogRouter);

 //admin route
 app.use('/admin',adminRouter);

 //404 middleware
 app.use((req, res) => {
    res.status(404).render('404');
})
