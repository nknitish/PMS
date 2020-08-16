const mongoose = require('mongoose');

const addCaogerySchema= mongoose.Schema({
    
    Catname : String
})

var Catogery = mongoose.model('Catogery',addCaogerySchema);

module.exports=Catogery;