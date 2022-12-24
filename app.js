//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _=require("lodash");

const app=express();


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const updation_name={};

const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB");
const blogStructreSchemea=new mongoose.Schema({
  blogTitle:String,
  blogBody:String
})
const blogModel=mongoose.model("Blog",blogStructreSchemea);



const homeStartingContent ="Welcome to our Blogging website here you can post your own blogs and"+ 
" find the description on home page. "+"Be Unique – Make your blog post description as unique as can because it make your blog unique than others."+
""
const aboutContent = "I created a simple blogging website in which you can easily compose or create a blog and post it on our website.";
const name="My name is Parmesh Kumar";
const devloper="I am a web developer & i created a simple blogging website.";
const contactContent = "If you have any query you can Gmail us on 'parmeshsingh6666@gmail.com' ."

app.get("/",(req,res)=>{
  blogModel.find({},(err,foundedblogs)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("successfully founded blogs");
      res.render("home",{homeContent:homeStartingContent, blogs:foundedblogs});
    }
  })
  
})
app.get("/compose",(req,res)=>{
  res.render("compose");
})

app.post("/compose",(req,res)=>{
  if((req.body.titlebody).length===0 || (req.body.postbody).length===0){
    console.log("Some thing is empty");
    res.redirect("/compose");
  }
  else{
    const datatitle=new blogModel({
      blogTitle:req.body.titlebody,
      blogBody:req.body.postbody
    })
    datatitle.save();
    res.redirect("/");
  }
})
app.get("/about",(req,res)=>{
  res.render("about",{aboutdata:aboutContent,name1:name,devloper1:devloper});
})

app.get("/posts/:variable",(req,res)=>{
  blogModel.find({},(err,foundedblog)=>{
    for(let i=0;i<foundedblog.length;i++){
      if(_.lowerCase(foundedblog[i].blogTitle)===_.lowerCase(req.params.variable)){
        res.render("post",{title1:foundedblog[i].blogTitle,content1:foundedblog[i].blogBody});
      }
    }
  })
})

//to delete the post we have to first take the delete item from the page and then apply get method 

app.post("/delete",(req,res)=>{
  blogModel.deleteOne({title:req.body.title},(err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("successfully deleted");
      res.redirect("/");
    }
  })
})
app.post("/edit",(req,res)=>{
  updation_name["editing_title"]=req.body.edit_title;
  res.redirect("/updatingcontent");
})
app.get("/updatingcontent",(req,res)=>{
  res.render("updated");
})
app.post("/processing-update",(req,res)=>{
  if((req.body.newtitlebody).length===0 || (req.body.newpostbody).length===0){
    console.log("Some thing is empty");
    res.redirect("/updatingcontent");
  }
  else{
    blogModel.updateOne({blogTitle:updation_name.editing_title},
      {blogTitle:req.body.newtitlebody,blogBody:req.body.newpostbody},(err)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log("Successfully updated");
        res.redirect("/");
      }
    })
  }
})
app.get("/contact",(req,res)=>{
  res.render("contact",{contacts:contactContent});
})

app.listen(5000, function() {
  console.log("Server started on port 5000");
});








// old codes for safety purpose use
//home mid codes


// const posts=[];
// const app = express();
// app.use(bodyParser.urlencoded({extended:true}));
// app.set('view engine', 'ejs');

// app.use(express.static("public"));


// app.get("/",(req,res)=>{
  
//   res.render("home",{para_data:homeStartingContent,posts_:posts});
// })
// app.get("/about",(req,res)=>{
//   res.render("about",{detail:aboutContent});
// })
// app.get("/posts/:variable",(req,res)=>{
//   for(let i=0;i<posts.length;i++){
//     if(_.lowerCase(req.params.variable)===_.lowerCase(posts[i].title)){
//       res.render("post",{title1:posts[i].title,content1:posts[i].content});
//     }
//   }
// })

// app.get("/contact",(req,res)=>{
//   res.render("contact",{contacts:contactContent});
// })
// app.get("/compose",(req,res)=>{
//   res.render("compose");
// })
// app.post("/compose",(req,res)=>{
//   const post={
//     title:req.body.titlebody,
//     content:req.body.postbody
//   };
//   posts.push(post);
  
//   res.redirect("/");
// })

