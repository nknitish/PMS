var express = require('express');
var router = express.Router();
var session = require('express-session');  // session
// const app= express();   
// app.use(session({secret: 'Nknitish',saveUninitialized: true,resave: true}));   // session

//MiddleWhere
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


/* GET users listing. */
router.get('/home',CheakLogin, function(req, res, next) {
  res.render('Home',{LoginUserName: req.session.LoginUserName});
});


//Log out
router.get('/home/logout', function(req, res, next) {
  req.session.destroy((err)=>{
    console.log("Session Destroyed")
    res.redirect('/');
  })
  
});


module.exports = router;



