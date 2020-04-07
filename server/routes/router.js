'use strict';
var path = require('path');

module.exports = (app)=>{

    app.use('/api/login',require('../api/login'));
    app.use('/api/company',require('../api/company'));
    app.use('/api/user-profile',require('../api/user-profile'));
    app.use('/api/job-posting',require('../api/job-posting'));
    
    app.route('/*').get((req,res,next)=>{
        res.sendFile(app.get('appPath') + '/dist/index.html');
     });
}
