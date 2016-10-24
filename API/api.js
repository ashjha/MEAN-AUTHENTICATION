var USER = require('../schema/user');
var bcrypt = require('bcryptjs');

exports.addusr = function(req, res) {

    var usr = new USER({
        username: req.body.name,
        email: req.body.email        
    });

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            usr.password = hash;
            usr.save(function(err, d) {
                if (err) res.send({
                    success: false,
                    d: err
                });
                else res.send({
                    success: true,
                    d: d
                });
            })
        });
    });
}

exports.login=function(req,res){

   USER.findOne({$or:[{username:req.body.username},{email:req.body.username}]} ,
    function(err,usr){
        if(err) res.send({success:false , d:err});
        else if(!usr) res.send({success:false , d:'Wrong username/password'});
        else {
            bcrypt.compare(req.body.password, usr.password, function(err, isMatch) {       
                if(!err && isMatch) setSesstion(req,res,usr);
                else res.send({success:false , d:'Wrong username/password'});
            });            
        }
    });
}

function setSesstion(req,res ,data){
     req.session.sessUser ={
        ID: data._id,
        userAuthenticate: true,
        name: data.username
      }
      res.send({success:true , d:data});
}

exports.authenticate=function(req,res,next){    
    if(req.session.sessUser) return next();
    else res.redirect('/');
}

exports.logout=function(req,res){
    req.session.destroy(function(err) {  console.log(err); });
    res.redirect('/');
}