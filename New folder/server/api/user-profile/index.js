'use strict';

const express = require('express');
const router = express.Router();
var controller = require('./user-profile.controller');
var multer = require("multer");
const path = require("path");
const fs = require("fs");

router.get ('/getprofile/:profileId',controller.getProfileDetail);

router.post ('/register',controller.registerUser);
router.post ('/update-profile/:profileId',controller.UpdateProfile);

router.post ('/upload', multer({dest: "./attachements/company/"}).single("uploads"),(req,res)=>{
    const tempPath = req.file.path;
    const targetPath = "./attachements/companyDocument/"+req.file.filename+"_"+req.file.originalname;

    console.log("1",tempPath)
    console.log("2",targetPath)
    console.log("1")
    console.log("1")
    req.file.savedPath="companyDocument/"+req.file.filename+"_"+req.file.originalname;
        fs.rename(tempPath, targetPath, err => {
            res.send(req.file); 
        });
});

module.exports = router;