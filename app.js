//jshint esversion:6
// _______________________________DATABASE CODE_________________________________
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  mongoose.set('strictQuery', true)
  await mongoose.connect('mongodb://127.0.0.1:27017/BlogDB');
}

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

blogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

Blog = mongoose.model("Blog", blogSchema)

postSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

Post = mongoose.model("Post", postSchema)

// Blog.insertMany(home_content, function(err) {
//   if (!err) {
//     console.log("Item added successfully");
//   }
// })

// ________________________________SERVER CODE__________________________________
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash")

const posts = []

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Home page
app.get("/", function(req, res) {
  Blog.findOne({blogTitle: "Home"}, function(err, blog) {
    if (!err) {
      Post.find(function(err, posts) {
        if (!err) {
          res.render("home", {home: blog.content, posts: posts})
        }
      })
    }
  })
})

// Rendering individual post
app.get("/posts/:id", function(req, res) {
  post_id = req.params.id

  Post.findOne({_id: post_id}, function(err, result) {
    if (!err) {
      res.render("post", {title: lodash.startCase(result.postTitle), content: result.content})
    }
  })
})

app.get("/about", function(req, res) {
  res.render("about", {about: aboutContent})
})

app.get("/contact", function(req, res) {
  res.render("contact", {contact: contactContent})
})

app.get("/compose", function(req, res) {
  res.render("compose")
})

// Make new blog posts
app.post("/compose", function(req, res) {

  blogPost = new Post({
    postTitle: req.body.title.toLowerCase(),
    content: req.body.post
  })

  Post.insertMany(blogPost, function(err) {
    if (!err) {
      console.log("New post made successfully");
    }
  })

  res.redirect("/")
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});


































//
