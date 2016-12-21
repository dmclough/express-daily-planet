var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");

//app variables
var app = express();
var db = require("./models");

//set/use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));


//routes
//Home page
app.get("/", function(req, res){
  res.render("site/home");
});

//contact page
app.get("/contact", function(req, res){
  res.render("site/contact");
});

//contact page
app.get("/about", function(req, res){
  res.render("site/about");
});

// GET /articles/new
// view: views/articles/new.ejs
// purpose: displays a form that users use to create a new article
app.get("/articles/new", function(req, res){
  res.render("articles/new");
});

app.get("/articles/show", function(req, res){
  res.render("articles/show");
});


app.get("/articles/index", function(req, res){
  res.render("articles/index");
});


// POST /articles
// view: none (redirects to /articles after the article is created)
// purpose: creates a new article (adds to articles array and saves the file)
app.post("/articles", function(req, res){
  console.log(req.body);
  db.article.create(req.body).then(function(articles){
    res.redirect("/articles/show");
  });
});


// GET /articles
// view: views/articles/index.ejs
// purpose: displays a list of all articles
app.get("/articles", function(req, res) {
   db.article.findAll().then(function(articles) {
       console.log(articles);
       res.render("/articles/index",
       {
           articles: articles
       });
   });
});


// GET /articles/:id
// view: views/articles/show.ejs
// purpose: find an article by id in the array of articles and display it.

// app.get("/articles/:id", function(req, res){
//   console.log(req.params.id);
//   db.article.findById(req.params.id).then(function(article){
//     res.render("articles/show", {article: article});
//   });
// });


//listen
app.listen(3000);
