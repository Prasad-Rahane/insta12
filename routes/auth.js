const express = require('express')
const router = express.Router()
const mongoose =require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET}=require('../config/key')
const requireLogin = require('../middleware/requireLogin')
//const nodemailer = require('nodemailer')
//const sendgridTransport = require('nodemailer-sendgrid-transport')
//const {SENDGRID_API,EMAIL} = require('../config/key')

//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

//const transporter = nodemailer.createTransport(sendgridTransport({
   // auth:{
       // api_key:"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"
   // }
//}))

router.post('/signup',(req,res)=>{
    const {name,email,password,pic} =req.body
    
    if(!email ||!password  || !name){
       return res.status(422).json({error:"Please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with that eamil"})
        }

    bcrypt.hash(password,12) 
    .then(hashedpassword=>{
        const user =new User({
            email,
            password:hashedpassword,
            name,
            pic
        })
        user.save()
        .then(user=>{
             // transporter.sendMail({
                   // to:user.email,
                   // from:"prasadrahane2390@gmail.com",
                   // subject:"signup success",
                   // html:"<h1>welcome to instagram</h1>"
                // })
            res.json({message:"saved successfully"})
        })
        .catch(err=>{
            console.log(err)
        })
    })   


    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/signin',(req,res)=>{
    const{email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"Please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


module.exports = router