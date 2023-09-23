const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose")
const Blog = require("./model/Blog");
const blogRouter = require("./router/blogRouter");
const adminRouter = require("./router/adminRouter");
const app = express();

const dbURI = "mongodb+srv://venoox:test1234@cluster0.a9ct3mq.mongodb.net/"

mongoose.connect(dbURI)
.then(result => app.listen(4000))
.catch(err=> console.log(err));






//middleware
app.set('view engine' , 'ejs');
app.engine('ejs', require('ejs').__express);


//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


//routers
app.use("/blog" , blogRouter);
app.use("/admin" , adminRouter);
app.get("/" , (req,res)=>{
    res.redirect("/blog")
})
app.get("/about" , (req,res)=>{
    res.render("about" , {user:adminRouter.userreq});
})