const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


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

/* app.use((req, res, next) => {
    console.log('try middlewares');
    next();
}) */

//set the ejs view engine
app.set('view engine', 'ejs');


//routes 
//responsre to a request 
app.get('/', (req, res) =>{
    Blog.find()
        .then(result => {
            res.render('index', {blogs: result});
        }).catch(err => console.log(err));
});
app.get('/services', (req, res) =>{
    res.render('services');
});

app.get('/blog', (req, res) =>{
    res.render('blog');
});
app.get('/about', (req, res) =>{
    res.render('about');
});
app.get('/blogs/create', (req, res) =>{
    res.render('create');
});

app.use((req, res) => {
    res.status(404).render('404');
})