var _ = require('lodash');
var UserProfile = require('./user-profile.model');
var User = require('./../login/login.model');

exports.registerUser = (req,res)=>{
    var Obj = req.body;

    var userObj = {
        userName : Obj['email'],
        password : Obj['password'] ? Obj['password'] : "password",
        loginType : Obj['loginType'] ? Obj['loginType'] : "userlogin",
        status : true,
        createdOn : new Date()
    };
    
    User.create(userObj,(err, profDt)=>{

        if(err){
            return res.json({code:500, result:err, info:"User registration failed"});
        }

        var profObj = {};
        profObj['firstName'] = Obj['firstName'];
        profObj['lastName'] = Obj['lastName'];
        profObj['mobile'] = Obj['mobile'];
        profObj['userId'] = profDt ? profDt._id : null;
        profObj['createdOn'] = new Date();
        
        UserProfile.create(profObj,(err,data)=>{

            if(err){
                return  res.json({code:500, result:err, info:"User profile creation failed"});
            }

            return  res.json({code:200, result:"User registration Success", data});
            
        });
        
    });
};

exports.getProfileDetail = (req,res)=>{

    UserProfile.findOne({userId : req.params.profileId}).populate('userId').exec((err,data) => {

        if(err){
            return  res.json({code : 500, result : err});
        }
        
        return res.status(200).json(data);

    });
};

exports.UpdateProfile = (req,res)=>{

    var profileId = req.params.profileId;

    UserProfile.findByIdAndUpdate(profileId, { $set : req.body },(err, data)=>{

        if(err){
            return  res.json({"code":500,"result":err});
        }

        return  res.json({code:200, result:"Profile updated Successfully"});    
    });
}
