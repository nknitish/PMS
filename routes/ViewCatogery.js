var express= require('express');
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


//Catogery // /
router.get('/viewCatogery',CheakLogin,(req,res,next)=>{
    Catogery.find({},{Catname:1,_id:1},(err,result)=>{
        if (err) throw err;
        else if (result) 
        {
            res.render('viewCatogery',{data:result});
        }
        
    })
    
});

// Catogery //  Edit // Get
router.get('/Cat/edit/:id',CheakLogin,(req,res,next)=>{
    Catogery.findById({_id: req.params.id},(err,result)=>{
        res.render('editCatogery',{data:result , msg : ""})
    })
});

// Catogery //  Edit // Post
router.post('/Cat/edit/:id',CheakLogin,(req,res,next)=>{
    Catogery.findByIdAndUpdate({_id: req.body.id} ,{Catname : req.body.Catname},(err,result)=>{
        if(err) throw err;
        else if (result)
        res.redirect('/viewCatogery')
    })
});


// Catogery // delete
router.get('/Cat/delete/:id',CheakLogin,(req,res,next)=>{
    Catogery.findByIdAndDelete({_id:req.params.id},(err,result)=>{
        if(err) throw err;
        else if (result)
        res.redirect('/viewCatogery')
    })
});



module.exports=router;