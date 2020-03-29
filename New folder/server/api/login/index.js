'use strict';

const express = require('express');
const router = express.Router();
var controller = require('./login.controller');

router.post ('/loginAuthentication',controller.loginAuthentication);
router.post('/saveLoginUser',controller.saveLoginUser);
router.post('/mailValidationAndRestPswd',controller.mailValidationAndRestPswd);
router.post('/passwordReset',controller.passwordReset);
router.post ('/sendUserRegisterMail',controller.sendUserRegisterMail);

module.exports = router;