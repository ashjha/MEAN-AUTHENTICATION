var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var User = new Schema({
    username:{type:String,lowercase:true},
    email:{type:String,unique:true,lowercase:true},
    password:String
});

module.exports=mongoose.model('user',User,'user');