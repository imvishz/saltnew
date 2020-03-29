var _ = require('lodash');
var fs = require('fs');
var Company = require('./company.model');
var User = require('./../login/login.model');

exports.saveCompanyDetails = (req,res)=>{
    var compObj = req.body;
    compObj.createdOn=new Date();

    var userObj = {
        userName : compObj['email'],
        password : compObj['password'] ? compObj['password'] : "password",
        loginType : "company",
        status : compObj['status'] == "Active" ? true : false,
        createdOn : compObj['createdOn']
    };
    
    Company.create(compObj,(err,data)=>{

        if(err){
            return  res.json({code:500, result:err, info:"Company creation failed"});
        }
        
        User.create(userObj,(err,data)=>{

            if(err){
                return  res.json({code:500, result:err, info:"User creation failed"});
            }

            return  res.json({code:200, result:"Saved Successfully"});
            
        });
        
    });
}

exports.getCompanyList = (req,res)=>{
    Company.find({}).sort('-createdOn').exec((err,data)=>{
        res.status(200).json(data);
    });
}
exports.getActiveCompanyList = (req,res)=>{
    Company.find({status:"Active"}).sort('-createdOn').exec((err,data)=>{
        res.status(200).json(data);
    });
}

exports.getCompanyDetail = (req,res)=>{
    var id=req.params.id;
    Company.find({_id:id}).lean().exec((err,data)=>{
        if(data.length > 0 && data[0].filePath){
            // var fileTxt = fs.readFileSync(data[0].filePath);
            // var encode_file = fileTxt.toString('base64');
            // data[0]['fileBuffer'] = 'data:' + data[0]['fileType'] + ';base64,' + encode_file;
            res.status(200).json(data);
        } else {
            res.status(200).json(data);
        }        
    });
}

exports.deleteCompany = (req,res)=>{
    Company.findOneAndDelete({_id:req.params.id},(err,data)=>{
        res.status(200).json(data);
    });
}


exports.UpdateCompanyDetail = (req,res)=>{
    var id=req.body.companyId;
    Company.update({_id:id},{$set:req.body},(err,data)=>{
        if(err){
            return  res.json({"code":500,"result":err});
        }
        return  res.json({"code":200,"result":"Saved Successfully"});    
    });
}

exports.UpdateCompanyStatus = (req,res)=>{
    var compId=req.params.companyId;

    Company.update({_id:compId},{$set: { status:req.body.status, modifiedOn : new Date()}},(err1,data)=>{

        if(err1){
            return  res.json({code:500, result:err1});
        }

        else if(req.body.status == 'Active' || req.body.status == 'Inactive'){

            Company.findById(compId).exec(function(err2, compData){

                if(err2){
                    return  res.json({code:500, result:err2});
                }

                let newStatus = compData.status == 'Active' ? true : false;

                User.update({email:compData.email},{ $set : { status:newStatus } },(err3,datas)=>{

                    if(err3){
                        return  res.json({code:500, result:err3});
                    }

                    return  res.json({code:200, result:"Status updated Successfully"}); 

                });
            });
            
        } 

        else {
            return  res.json({code:200, result:"Status updated Successfully"});    
        }        
    });
}