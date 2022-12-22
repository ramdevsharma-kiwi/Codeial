const User = require("../models/user")

const { userInfo } = require("os");

module.exports.profile = function(req,res){
    return res.render('user',{
        title:"User Profile"
    });
}

// render sign up
module.exports.SignUp = function(req,res){
    return res.render('user-signup',{
        title:"Codeial | Sign Up"
    });
}

// render sign in
module.exports.SignIn = function(req,res){
    return res.render('user-signin',{
        title:"Codeial | Sign In"
    });
}


//  get the sign up data

module.exports.create = function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if (err){console.log(`Error in finding in signing up`)
    return}
    if (!user){
        User.create(req.body,function(err,user){
            if (err){console.log(`Error in creating user in signing up`)
            return}
            return res.redirect('/users/sign-in')
        })
    }
    else{
        return res.redirect('back');
    }
    })
}

// sign in and create the session for the user

module.exports.createSession= function(req,res){

}
    
