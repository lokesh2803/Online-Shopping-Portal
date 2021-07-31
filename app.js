const { Console } = require('console');
var alert=require('alert');
var express=require('express');

var path=require('path');
const db_con = require('./public/apps/dbconnection');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended : true}));

app.set("views","./views");
app.set("view engine","ejs");

app.post('/confirmorder',function(req,res){
  var name=req.body.name;
  var address=req.body.address;
  var mobileno=req.body.mobilenum;
  var products=req.body.products;
  console.log(products);
  var amount=req.body.payable;
  require('./public/apps/sendmail').confirm_order(login_id_mail,name,address,mobileno,products,amount,function(x){});
  require('./public/apps/order').AddToOrders(login_id,name,address,mobileno,products,amount,function(x){
    res.render('redirecthome.ejs');
  })
})

app.post('/placeorder',function(req,res){
  var products=req.body.productname;
  var amount=req.body.totalamount;
  var x=amount.split('.');
  res.render('placeorder.ejs',list={name:login_id, products:products, payable:x[1]});
})

app.post('/removecart',function(req,res){
  var product_id=req.body.productName;
  var searchname=req.body.search;
  console.log(product_id);
    require('./public/apps/cart').RemoveFromCart(login_id,product_id,function(x){
    require('./public/apps/home').AllProducts(function(list){
      require('./public/apps/home').getCartSet(login_id,function(set){
        console.log(set);
        res.render('cart.ejs',products={user:login_id, product: list,cart:set});
      })
    })
  })
})

app.get('/cart',function(req,res){
  console.log("Logged in with Username: "+login_id);
  require('./public/apps/home').AllProducts(function(list){
    require('./public/apps/home').getCartSet(login_id,function(set){
      console.log(set);
      res.render('cart.ejs',products={user:login_id, product: list,cart:set});
    })
  })
})

app.get('/profile',function(req,res){
  require('./public/apps/profile').orderDetails(login_id,function(y){
    res.render('profile.ejs',x={name:login_id, mail:login_id_mail, orders:y});
  })
})

app.post('/addcart',function(req,res){
  var product_id=req.body.productName;
  var searchname=req.body.search;
  console.log(product_id);
  
  require('./public/apps/home').SearchProducts(searchname,function(list){
    require('./public/apps/home').AddToCart(login_id,product_id,function(set){
      res.render('home.ejs',products={user:login_id, product: list,searchvalue:searchname,cart:set});
    })
  });
})

app.post('/home',function(req,res){
  console.log("Logged in with Username: "+login_id);
  var searchname=req.body.search;
  require('./public/apps/home').SearchProducts(searchname,function(list){
    require('./public/apps/home').getCartSet(login_id,function(set){
      res.render('home.ejs',products={user:login_id, product: list,searchvalue:searchname,cart:set});
    })
  });
})

app.get('/home',function(req,res){
  console.log("Logged in with Username: "+login_id);
  require('./public/apps/home').AllProducts(function(list){
    require('./public/apps/home').getCartSet(login_id,function(set){
      res.render('home.ejs',products={user:login_id, product: list,searchvalue:"",cart:set});
    })
  })
})

app.get('/redirectpage',function(req,res){
  res.render('redirectpage.ejs')
})

app.post('/change_password',function(req,res){
  var newpass=req.body.pass1;
  var newpass1=req.body.pass2;
  
  require('./public/apps/change_pass')(newpass,newpass1,function (y){
    if(!y){
      res.render('change_password.ejs',list={oldpass: false,wrongpass: true})
    }
    else{
  var db_con=require('./public/apps/dbconnection');
  var sql='select password from signup where email=?';
  db_con.query(sql,[login_id_mail],function(err,result,fields){
    if(err) throw err;
    var x=result[0].password;
    require('./public/apps/crypo').decrypt(x,function(pass){
    if(pass==newpass){
      res.render('change_password.ejs',list={oldpass: true,wrongpass: false})
    }
    else{
      require('./public/apps/update_pass')(login_id_mail,newpass,function(x){});
      res.redirect('/redirectpage');
    }
  })
  })}
})
})

var login_id_mail;
app.get('/change_password',function(req,res){
  res.render('change_password.ejs',list={oldpass: false,wrongpass: false})
})

var OTP;
app.post('/forgot_password',function(req,res){
  var mail=req.body.mail;
  var otp=req.body.otp;
  
  if(otp==null){
    
  require('./public/apps/forgot_pass')(mail,function(x){
    if(x){
      var num=Math.floor(Math.random() * (99999 - 10000) + 10000);
      OTP=num;
      login_id_mail=mail;
      require('./public/apps/sendmail').send_The_OTP(mail,num,function(x){});
      res.render('forgot_password.ejs',list={mail_Show: false, otp_Show: true,validotp: true, mailwrong:false})
    }
    else{
      res.render('forgot_password.ejs',list={mail_Show: true, otp_Show: false,validotp: true, mailwrong:true})
    }
  })
  }
  else{
    if(OTP==otp){
      OTP="";
      res.redirect('/change_password');
    }
    else{
      res.render('forgot_password.ejs',list={mail_Show: false, otp_Show: true, validotp: false, mailwrong:false})
    }
  }
  
})

app.get('/forgot_password',function(req,res){
  var x={
    mail_Show: true,
    otp_Show: false,
    validotp: true
  }
    res.render('forgot_password.ejs',list=x);
})

var login_id;
app.post('/login',function(req,res){
  var user=req.body.name;
  var pass=req.body.password;
  
  
      require('./public/apps/login')(user,pass,function (x){
        if(x.admit){
          login_id=user;
          login_id_mail=x.mail;
            res.redirect('/home');
        }
        else{
          res.render('login.ejs',list={valid_id: false});
        }
      })
})
app.get('/login',function(req,res){
  res.render('login.ejs',list={valid_id: true});
})

var MailVerified=false;
app.post('/signup',function(req,res){
  var mail=req.body.mail;
  var otp=req.body.otp;
  var user=req.body.uname;
  var pass=req.body.password;

  var signup=require('./public/apps/signup');
  signup.check_existing_mail(mail,function(mail_exist){
    if(mail_exist){
      res.render('signup.ejs',list={mailverify:false, mailname:mail, otpwrong:false, passwrong:false,userexist:false,mailexist:true});
    }
    else{
      if(!MailVerified){
        if(otp==null){
          var num=Math.floor(Math.random() * (99999 - 10000) + 10000);
            OTP=num;
            require('./public/apps/sendmail').send_The_OTP(mail,num,function(x){});
            res.render('signup.ejs',list={mailverify:false, mailname:mail, otpwrong:false,passwrong:false,userexist:false,mailexist:false});
        }
        else{
            if(OTP==otp){
              MailVerified=true;
              res.render('signup.ejs',list={mailverify:true, mailname:mail, otpwrong:false,passwrong:false,userexist:false,mailexist:false});
              }
              else{
                res.render('signup.ejs',list={mailverify:false, mailname:mail, otpwrong:true,passwrong:false,userexist:false,mailexist:false});
              }
        }
    }
    else{
      signup.check_existing_user(user,pass,function(x){
        if(x.user_exist){
          res.render('signup.ejs',list={mailverify:true, mailname:mail, otpwrong:false,passwrong:false,userexist:true,mailexist:false});
        }
        else if(!x.user_exist && !x.crct_password){
              res.render('signup.ejs',list={mailverify:true, mailname:mail, otpwrong:true,passwrong:true,userexist:false,mailexist:false});
          }
        else{
              signup.add_user(mail,user,pass,function(x){});
              MailVerified=false;
              res.redirect('/redirectpage');
            }
      })
    }
    }
  })
  
})

app.get('/signup',function(req,res){
  res.render('signup.ejs',list={mailverify:false, mailname:"", otpwrong:true, passwrong:false,userexist:false,mailexist:false});
})

app.get('/',function(req,res){
  res.render('index.ejs');
})

app.listen(3000,function(){
    console.log('App started on server 3000');
});