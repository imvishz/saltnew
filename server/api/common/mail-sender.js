var nodemailer = require('nodemailer');




exports.mailSenderFunction =(mailOptions)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vimal9314@gmail.com',
          pass: 'vimal9314'
        }
      });
console.log("mailOptions")
console.log(mailOptions)
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}