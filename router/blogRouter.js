const express = require("express");
const Blog = require(".././model/Blog");
const adminRouter = require("./adminRouter")

const router = express.Router();

//get blog posts to index
router.get("/",(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then(result=>res.render("index" , {blogs:result,user:adminRouter.userreq}))
    .catch(err=>console.log(err))
})

//get blog post by id to detail
router.get("/:id" , (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{res.render("detail" , {blog:result , user:adminRouter.userreq})})
    .catch(err=>console.log(err));
})


module.exports = router;