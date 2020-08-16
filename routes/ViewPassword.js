var express= require('express');
var router= express.Router();
const Catogery= require('../Model/Catogery');
const Password = require('./../Model/Password');

//****** */
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


router.get('/viewPswd',CheakLogin,(req,res,next)=>{
    Password.find({},(err,result)=>{
        if(err) throw err;
        else if (result)
        res.render('viewPassword',{data: result}); 
    })
   
});

// Edit 
router.get('/pswd/edit/:id',CheakLogin,(req,res,next)=>{
       Password.findById({_id: req.params.id},(err,result)=>{
        if(err) throw err;
        else if (result)
        res.render('editPassword',{msg: "", data: result})
         
       })
});

// Edit // Post
router.post('/pswd/edit/:id',CheakLogin,(req,res,next)=>{
  
    const data={
        Catname : req.body.Catname,
        Projectname: req.body.Projectname,
        ProjectDetails : req.body.ProjectDetails,
        }
        
    const id = req.body.id;
    Password.findByIdAndUpdate({_id:id},data,(err,result)=>{
        if (err) throw err;
        else if (result)
        res.redirect('/viewPswd');
    })

});


// Delete
router.get('/pswd/delete/:id',CheakLogin,(req,res,next)=>{
    Password.findByIdAndDelete({_id:req.params.id},(err,result)=>{
        if(err) throw err;
        else if (result)
        res.redirect('/viewPswd')
    })
});


module.exports=router;