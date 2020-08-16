var express = require('express');
var router= express.Router();
const Catogery= require('../Model/Catogery');

const CheakLogin=(req,res,next)=>{

    try {
      if(req.session.LoginUserName)
       next();
      else
      res.redirect('/');   
    } catch (error) {
      res.redirect('/'); 
    }
};


//Add Catogery GET
router.get('/addCatogery',CheakLogin, (req, res, next)=>{
    res.render('addCatogery',{msg: ""});
})

//Add Catogery Post
router.post('/addCatogery',CheakLogin, (req, res, next)=>{
    console.log(req.body.Catname);
    new Catogery({Catname: req.body.Catname}).save((err,result)=>{
    if(err) throw err;
    if(result) 
    res.render('addCatogery',{msg: "Record Inserted Sucessfully"});
    })  
})



module.exports= router;