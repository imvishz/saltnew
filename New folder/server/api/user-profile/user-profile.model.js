var mongoose = require('mongoose');
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

var profileSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    firstName : String,
    lastName : String,
    employeeType : String, //store whether employee is Fresher/Experienced
    industry : String, // IT/Hardware?software/Core
    dob : Date,
    mobile : String,
    qualification : String,
    experience : String,
    skillset : [],
    exptCtc : String,
    location : String,
    createdOn : Date,
    modifiedOn : Date,
    fileName: String,
    filePath: String,
    fileType: String,
    orginalFilePath:String
});

module.exports = mongoose.model('user-profile',profileSchema);