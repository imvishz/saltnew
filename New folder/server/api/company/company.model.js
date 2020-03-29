var mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
  createdOn : Date,
  modifiedOn : Date,
  companyName: String,
  email: String,
  contactPerson: String,
  contactNo: Number,
  street:String ,
  city: String,
  postalCode: Number,
  country: String,
  status: String,
  fileName: String,
  filePath: String,
  fileType: String,
  orginalFilePath:String
});

module.exports = mongoose.model('companies',companySchema);