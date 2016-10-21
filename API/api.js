var USER = require('../schema/user');

exports.addusr=function(req,res){

    var usr = new USER({
        username:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    usr.save(function(err,d){
        if(err) res.send({success:false , d:err});
        else res.send({success:true , d:d});  
    })
	
}

exports.login=function(req,res){
    USER.findOne({$or:[{username:req.body.username,password:req.body.password},{email:req.body.username,password:req.body.password}]} ,
    function(err,usr){
        if(err) res.send({success:false , d:err});
        else if(!usr) res.send({success:false , d:usr});
        else setSesstion(req,res,usr);
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
    console.log(req.session.sessUser);
    if(req.session.sessUser) return next();
    else res.redirect('/');
}

exports.logout=function(req,res){
    req.session.destroy(function(err) {  console.log(err); });
    res.redirect('/');
}