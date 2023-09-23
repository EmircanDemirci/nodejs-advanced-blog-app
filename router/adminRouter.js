const express = require("express");
const Blog = require("./../model/Blog")
const User = require(".././model/User");

const router = express.Router();

//req.user variable
let userreq;

//get admin dashboard and admin login
router.get("/" , (req,res)=>{
    res.render("adminlogin" , {user:userreq})
})

router.post("/" , async (req,res)=>{
    await User.findOne({email:req.body.email , password:req.body.password})
    .then(result=>{
        if(result === null){
            res.redirect("/")
        }else{
            res.redirect("/admin")
            userreq = result;
        }
    })
    .catch(err=>console.log("err"));
})

//admin post create page
router.get("/create-post" , (req,res)=>{
    res.render("createpost" , {user:userreq})
})
router.post("/create-post" , async (req,res)=>{
    const newPost = await new Blog({title:req.body.title , snippets:req.body.snippets , img:req.body.img , body:req.body.body})
    newPost.save()
    .then(result=>res.redirect("/admin/edit-post"));
})

//admin post edit page
router.get("/edit-post" , (req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then(result=>res.render("editposts" , {blogs:result,user:userreq}))
    .catch(err=>console.log(err))
})

router.get("/edit-post/:id" , (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>res.render("editpost" , {blog:result,user:userreq}))
    .catch(err=>console.log(err))
})

router.delete("/edit-post/:id" ,(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>res.json({redirect:"/admin/edit-post"}))
    .catch(err=>console.log(err));
})


//user page
router.get("/users" , (req,res)=>{
    User.find().sort({createdAt:-1})
    .then(result=>res.render("users" , {users:result, user:userreq}))
    .catch(err=>console.log(err))
})
router.delete("/users/:id" , (req,res)=>{
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(result=>res.json({redirect:"/admin/users"}))
        .catch(err=>console.log(err));
})

router.get("/users/detail/:id" , (req,res)=>{
    User.findById(req.params.id)
    .then(result=>res.render("userdetail" , {usdetails:result , user:userreq}))
    .catch(err=>console.log(err))
})

router.get("/users/create", (req,res)=>{
    res.render("createuser" , {user:userreq});
})
router.post("/users/create" , async (req,res)=>{
    const newUser = await new User({username:req.body.username , password:req.body.password , email:req.body.email})
    newUser.save()
    .then(result=>res.redirect("/admin/users"));
})




module.exports = router;