var nodemailer=require('nodemailer');

var transporter=nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: 'lokeshdummymail@gmail.com',
    pass: 'Loki123#'
  }
})

exports.send_The_OTP=function send_The_OTP(mail,otp,callback){   
      var mailOptions = {
        from: 'lokeshdummymail@gmail.com',
        to: mail,
        subject: 'ShopEasy OTP - '+otp,
        text: 'Please find the Email OTP. Use this password immediately else you need to reset once again\n'+
        
        'One Time Password(OTP):- '+otp+
        
        '\nThanks & Regards,\n'+
        'ShopEasy Team\n'+
        '***** This is auto generated email. Please do not reply. *****\n'+
        
        
        'If you have received this email in error, please ignore\n'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }

exports.confirm_order=function confirm_order(mail,name,address,mobileno,products,amount,callback){   
        var mailOptions = {
          from: 'lokeshdummymail@gmail.com',
          to: mail,
          subject: 'ShopEasy Order - Confirmation',
          text: 'Your Order has been confirmed. Expect the delivery soon\n'+
                'Name : '+name+'\n'+
                'Delivery Address : '+address+'\n'+
                'Mobile Number : '+mobileno+'\n'+
          
          '\nThanks & Regards,\n'+
          'ShopEasy Team\n'+
          '***** This is auto generated email. Please do not reply. *****\n'
          
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
      
      
      