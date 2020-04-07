'use strict';

const express = require('express');
const router = express.Router();
var controller = require('./job-posting.controller');

router.post ('/createJob',controller.createJob);
router.get ('/getJobList',controller.getJobList);
router.get ('/getJobDetail/:jobId',controller.getJobDetail);
router.post ('/updateJobDetail/:jobId',controller.updateJobDetail);
router.delete ('/deleteJob/:jobId',controller.deleteJob);

module.exports = router;