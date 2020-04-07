'use strict';

const express = require('express');
const router = express.Router();
var multer = require("multer");
var controller = require('./company.controller');
const path = require("path");
const fs = require("fs");

router.post ('/create-company',controller.saveCompanyDetails);
router.get ('/getCompanyList',controller.getCompanyList);
router.get ('/getActiveCompanyList',controller. getActiveCompanyList);
router.get ('/getCompanyDetail/:id',controller.getCompanyDetail);
router.post ('/update-company-status/:companyId',controller.UpdateCompanyStatus);
router.post ('/update-company',controller.UpdateCompanyDetail);
router.delete ('/deleteCompany/:id',controller.deleteCompany);

router.post ('/upload', multer({dest: "./attachements/company/"}).single("uploads"),(req,res)=>{
    const tempPath = req.file.path;
    const targetPath = "./attachements/companyDocument/"+req.file.filename+"_"+req.file.originalname;

    req.file.savedPath="companyDocument/"+req.file.filename+"_"+req.file.originalname;
        fs.rename(tempPath, targetPath, err => {
            res.send(req.file); 
        });
});

module.exports = router;