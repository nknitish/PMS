const mongoose = require('mongoose');

const PasswordSchema= mongoose.Schema({
    
    Catname : String,
    Projectname: String,
    ProjectDetails : String
})

var Password = mongoose.model('Password',PasswordSchema);

module.exports=Password;