const User = require("../models/user")

const { userInfo } = require("os");

module.exports.profile = function(req,res){
  if (req.cookies.user_id){
    User.findById(req.cookies.user_id ,function(err,user){
        if(user){
            res.render('user-profile',{
                title:"User Profile",
                user: user
            })
        }else{
            return res.redirect('/users/sign-in');

        }
    })
  }else{
    return res.redirect('/users/sign-in');

}
  
  
  
    // return res.render('user',{
    //     title:"User Profile"
    // });
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
//steps to authenticate

// find the user
User.findOne({emial: req.body.email}, function(err,user){
    if (err){console.log(`error in finding the user in sign in`) 
    return }
//handle user found
if (user){

//handle password which don't match
if (user.password != req.body.password){
    return res.redirect('back');
}
//handle session creation
res.cookie('user_id',user.id);
return res.redirect('/users/profile');
}else {

//handle user not found

return res.redirect('back')
}

    
})






}
    
