'use strict';

const express =require('express');
const bodyParser =require('body-parser');
const path =require('path');
const http =require('http');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/config')
mongoose.connect(config.mongo.url,{useNewUrlParser:true});
mongoose.connection.once('open',function(){
    console.log("connection made successfully!")
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//static file 
//Angular DIST output folder
//in the dist mean folder is automatically created i dont know y why 
//its weird please check in ur laptop guysssssss .its important
// app.use(express.static(path.join((__dirname,'../dist')))); 
app.use(express.static(path.join((__dirname,'./attachements')))); 
//set path url
app.set('appPath',__dirname+'/..');

//router config
require('./routes/router')(app);


//set port
const port = process.env.port || '9000';
app.set('port',port);

const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`Running on location:${port}`);
})