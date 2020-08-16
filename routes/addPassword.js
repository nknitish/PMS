var express = require('express');
var router= express.Router();
const Catogery= require('../Model/Catogery');
const Password = require('./../Model/Password');

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


//Add  Password GET
router.get('/addPswd', CheakLogin,(req, res, next)=>{
    Catogery.find({},(err,result)=>{
        if(err) throw err;
        else if(result)
        res.render('addPassword',{msg:"", data:result});
    }) 
})

//Add  Password POST
router.post('/addPswd',CheakLogin, (req, res, next)=>{
    const data= {
    Catname : req.body.Catname,
    Projectname: req.body.Projectname,
    ProjectDetails : req.body.ProjectDetails,
    }
    new Password(data).save((err,result)=>{
        if (err) throw err;
        else if (result)
        {
            Catogery.find({},(err,result)=>{
                if(err) throw err;
                else if(result)
                res.render('addPassword',{msg:"Record Inserted Sucessfully", data:result});
            }) 

        }
    })

})



module.exports= router;