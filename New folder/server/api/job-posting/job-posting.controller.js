var _ = require('lodash');
var JobPosting = require('./job-posting.model');

exports.createJob = (req,res)=>{
    var jobObj = req.body;
    jobObj.createdOn=new Date();
    JobPosting.create(jobObj,(err,data)=>{
        res.status(200).json({"status":"Saved Successfully!","code":200});
    });
}

exports.getJobList = (req,res)=>{
    JobPosting.find({}).populate('companyId').populate(['companyId']).sort('-createdOn').exec((err,data)=>{
        res.status(200).json(data);
    });
}

exports.getJobDetail = (req,res)=>{
    var id=req.params.jobId;
    JobPosting.find({_id:id}).populate('companyId').lean().exec((err,data)=>{
        if(data.length > 0 ) {
            res.status(200).json(data);
        }else{
            res.status(204).json({"status":"No Data Found!"});
        }      
    });
}

exports.deleteJob = (req,res)=>{
    JobPosting.findOneAndDelete({_id:req.params.jobId},(err,data)=>{
        res.status(200).json(data);
    });
}


exports.updateJobDetail = (req,res)=>{

    var id=req.body.jobId;

    JobPosting.update({_id:id},{$set:req.body},(err,data)=>{
        if(err){
            return  res.json({"code":500,"result":err});
        }
        return  res.json({"code":200,"result":"Saved Successfully"});    
    });
}