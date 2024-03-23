const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const Post = require("./models/posts")

const app = express();

mongoose.connect("mongodb+srv://anirudhmsai:Anirudh18@clusterone.dsmcb82.mongodb.net/mean-database?retryWrites=true&w=majority&appName=ClusterOne")
  .then(()=>{
    console.log('connected to database');
  })
  .catch(err=>{
    console.log(err)
  })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Avoids getting CORS error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  console.log(post);
  post.save();
  res.status(200).json({
    message : "success",
    postId : post._id
});
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then(doc=>{
      res.status(200).json({
        message: "Posts fetched succesfully!",
        posts: doc
      });
    })
});

app.delete("/api/posts:id", (req, res, next) => {
  Post.deleteOne({
    _id : req.params.id
  }).then(res => {
    console.log(res)
  });
  res.status(200).json({
    message: 'message deleted',
    id : res._id
  })
});

module.exports = app;
