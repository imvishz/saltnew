var _ = require('lodash');
var loginUser = require('./login.model');
var nodemailer = require('nodemailer');

exports.loginAuthentication = (req,res)=>{
    var loginObj = req.body;
    var userObj = {};
    var userType;
    if(loginObj.loginType==='companylogin'){
        userType = "companylogin";
    }
    else if(loginObj.loginType==='adminlogin'){
        userType = "adminlogin";
    } else {
        userType = "userlogin";
    }
    loginUser.findOne({userName : loginObj.userName , loginType: userType, status : true})
    .then(function(user) {
        userObj = user;
        console.log("userObj")
        console.log(userObj)
        loginObj['id']=userObj['_id'];
        if(user == null){
            return res.json({"code":204,"result":"No record found"});
        }
        return bcrypt.compare(loginObj.password, user.password);
    })
    .then(function(samePassword) {
        if(!samePassword) {
          return  res.json({"code":403,"result":"Password mismatch"});
        }
        var userObj = cookieDataToStore(userType,loginObj);
        return  res.json({"code":200,"result":"Authenticate successfully","data":userObj});
    })
    .catch(function(error){
        console.log("Error authenticating user: ");
        console.log(error);
        next();
    });
}
function cookieDataToStore(userType,loginObj){
    var obj = {};
    obj['userName'] = loginObj['userName'];
    obj['loginType'] = loginObj['loginType'];
    obj['emailId'] = loginObj['emailId'];
    obj['id'] = loginObj['id'];
    if(userType == "userlogin"){

    }else if(userType == "companylogin"){
    
    }else{

    }
    return obj;
}

exports.saveLoginUser = (req,res)=>{
    var loginObj = req.body;
    loginUser.create(loginObj,(err,data)=>{
        res.status(200).json({"status":"Saved Successfully!"});
    });
}

exports.mailValidationAndRestPswd = (req,res)=>{
    var loginObj = req.body;
    mailerFuc()
    loginUser.find({emailId:loginObj.userMailId,loginType:loginObj.reqestmadeBy,status:true},(err,loginDetail)=>{
        if(loginDetail.length>0){
            // mail functionality needed
            loginUser.update({_id:loginDetail[0]._id},{$set:{status:false}},(err,data)=>{
                return  res.json({"code":200,"result":"mail sent"});
            });
        }else{
            return res.json({"code":204,"result":"Invalid User Id"});
        }
    });
}

exports.passwordReset = (req,res)=>{
    var loginObj = req.body;
    loginUser.find({userName:loginObj.userName,status:true},(err,loginDetail)=>{
        if(loginDetail.length>0){
            loginUser.update({_id:loginDetail[0]._id},{$set:loginObj},(err,data)=>{
                if(err){
                    return res.json({"code":204,"result":err});
                }
                return  res.json({"code":200,"result":"Password reset successfully"});
            });
        }else{
            return res.json({"code":204,"result":"Cannot reset"});
        }
    });
}
exports.sendUserRegisterMail = (req,res)=>{
    var userObj = req.body;
    if(!userObj.hasOwnProperty('resumeName')){
        return res.json({"code":204,"result":"Resume Name is not sent!"});
    }else{
        let transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : 'usaconnect08091993@gmail.com', //saalt company emailId
                pass : '12USAConnect!@'
            }
        });
        let mailOptions = {
            from : 'usaconnect08091993@gmail.com', //saalt company emailId
            to : 'vimal9314@gmail.com', //user emailId
            subject: 'samle',
            text : 'IT working', 
            attachments : [{
                path:"./attachements/company/"+userObj['resumeName']
            }]
        }
        transporter.sendMail(mailOptions,(err,data)=>{
            if(err){
                return res.json({"code":500,"result":"Internal Server Error"});
            }else{
                return res.json({"code":200,"result":"Email Sent!"});
            }
        });
    }
}

function mailerFuc(){
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'usaconnect08091993@gmail.com',
            pass : '12USAConnect!@'
        }
    });
    let mailOptions = {
        from : 'vimal9314@gmail.com',
        to : 'vimal9314@gmail.com',
        subject: 'samle',
        text : 'IT working'
    }
    transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Email Sent!!!!')
        }
    })
}