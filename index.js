var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var path = require('path');

//app variables
var app = express();
var db = require("./models");
//set/use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'static')));

//routes

//DELETE
app.delete("/articles/:id", function(req, res) {
  db.article.destroy({
    where: { id: req.params.id }
  }).then(function() {
    res.send({message: 'success'});
  });
});
//END DELETE

//UPDATE
app.put('/articles/:id', function(req, res) {
  var articleToEdit = req.params.id;
  db.article.update({
    title: req.body.title,
    body: req.body.body
  }, {
    where: {
      id: articleToEdit
    }
  }).then(function() {
    res.status(200).send();
  });
});
//END UPDATE

app.get("/contact", function(req, res){
  res.render("site/contact");
});

app.get("/about", function(req, res){
  res.render("site/about");
});
// GET /
// view: views/index.ejs
// purpose: Serve the homepage of your site.
app.get("/", function(req, res){
  res.render("site/home");
});

// GET /articles // view: views/articles/index.ejs // purpose: displays a list of all articles
app.get("/articles", function(req, res) {
   db.article.findAll().then(function(articles) {
       res.render("articles/index", {articles: articles});
   });
});

// GET /articles/new // view: views/articles/new.ejs // purpose: displays a form that users use to create a new article
app.get("/articles/new", function(req, res){
  res.render("articles/new");
});

// GET /articles/:id // view: views/articles/show.ejs // purpose: find an article by id in the array of articles and display it.
app.get("/articles/:id", function(req, res){
  // console.log(req.params.id);
  db.article.findById(req.params.id).then(function(article){
    // console.log("article: ", aritcle);
    res.render("articles/show", {article: article});
  });
});

//Edit
app.get('/articles/:id/edit', function(req, res) {
  db.article.findById(req.params.id).then(function(article){
    res.render("articles/edit", {article: article});
  });
})

// POST /articles// view: none (redirects to/articles after the article is created) // purpose: creates a new article (adds to articles array and saves the file)
app.post("/articles", function(req, res){
  console.log(req.body);
  db.article.create(req.body).then(function(articles){
    console.log("created article:", articles);
    res.redirect("/articles");
  });
});
//listen
app.listen(3000);
