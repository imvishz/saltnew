var mongoose = require('mongoose');
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

var jobSchema = new mongoose.Schema({
    companyId : {type: mongoose.Schema.Types.ObjectId, ref: 'companies'},
    jobName : String,
    industry : String, // IT/Hardware?software/Core
    jobType : String,
    designation : String,
    location : String,
    description : String,    
    vacancy : String,
    qualification : String,
    experience : String,
    skills : String,
    dop : Date,
    expiryDate : Date,
    createdOn : Date,
    modifiedOn : Date
});

module.exports = mongoose.model('job-posting',jobSchema);