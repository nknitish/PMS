var express = require('express');
var router = express.Router();
const db= require('./../MongoDB/MongoDB');
const Login= require('./../Model/login');
const bcrypt = require('bcrypt');
var session = require('express-session');  // session

const app= express();   
app.use(session({secret: 'Nknitish',saveUninitialized: true,resave: true}));   // session

//***MiddleWhere */


//Cheak Registration MidleWhere
const cheakEmail=(req,res,next)=>{

  const email= req.body.useremail;
  var cheak= Login.findOne({useremail: email} ,(err, result)=>{

    if(err) throw err;
    if (result)
    return res.render('Registration',{msg : "Emailid Already Exist"});
    else next();

  });
}

//Cheak Login
const cheakLogin=(req,res,next)=>{

  const email= req.body.useremail;
  const password= req.body.userpassword;
    Login.findOne({useremail: email} ,(err, result)=>{
    if(err) throw err;
    if (result)
     {
        if(bcrypt.compareSync(password,result.userpassword))
        { 
          req.session.LoginUserName=result.username;  // Seting Session
          res.redirect('/home');
        }
        else
        return res.render('index', { title: 'Login' ,msg:"Password Do not Match" });
     } 
     else
     {
       return res.render('index', { title: 'Login' ,msg:"Invalid Email Id" });
     }

  });
}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' ,msg:"" });
});


//**Home PAge Post */

router.post('/',cheakLogin, function(req, res, next) {   });


//**Registration Page */
router.get('/Registration', function(req, res, next) {
  res.render('Registration', { msg:"" });
});

//**Registration Page  POST*/
router.post('/Registration', cheakEmail, function(req, res, next) {
  const data={
    username: req.body.username,
    useremail: req.body.useremail,
    userpassword: req.body.userpassword,
    cnfpassword : req.body.cnfpassword,
  }
 
  if (data.userpassword===data.cnfpassword)
  {
    data.userpassword= bcrypt.hashSync(data.userpassword,10);
    
    const t = new Login(data).save((err,result)=>{
      if(err) throw err;
      else if (result)
      res.render('Registration' , { msg:"Record Inserted Sucessfully"})
    })
  }
  else
  res.render('Registration' , { msg:"Password Do Not Match"})
    

});


module.exports = router;
