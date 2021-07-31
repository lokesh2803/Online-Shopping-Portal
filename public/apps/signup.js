const db_con = require('./dbconnection');

function remove_popup() {
    document.getElementById("password_criteria_wrong").style.display="none";
    document.getElementById("user_exist").style.display="none";
    var x= document.getElementById("password").value;
    if(x.length==0)
    document.getElementById("password_criteria").style.display="none";
    if(x.length>0 && x.length<8)
        document.getElementById("password_criteria").style.display="block";
    
     if(x.length>=8){
        var valid=[false,false,false,false];
         for(let i=0;i<x.length;i++){
             if(x[i]>='A' && x[i]<='Z'){
                 valid[0]=true;
             }
             else if(x[i]>='a' && x[i]<='z'){
                 valid[1]=true;
             }
             else if(x[i]>='0' && x[i]<='9'){
                 valid[2]=true;
             }
             else{
                 valid[3]=true;
             }
         }
         for(let i=0;i<valid.length;i++){
             if(valid[i]==false){
                document.getElementById("password_criteria").style.display="block";
                return;
            }
         }
         document.getElementById("password_criteria").style.display="none";
     }
  }

  function validate_password1(x) {
    
    if(x.length>0 && x.length<8)
        return false;
    
     if(x.length>=8){
        var valid=[false,false,false,false];
         for(let i=0;i<x.length;i++){
             if(x[i]>='A' && x[i]<='Z'){
                 valid[0]=true;
             }
             else if(x[i]>='a' && x[i]<='z'){
                 valid[1]=true;
             }
             else if(x[i]>='0' && x[i]<='9'){
                 valid[2]=true;
             }
             else{
                 valid[3]=true;
             }
         }
         for(let i=0;i<valid.length;i++){
             if(valid[i]==false){
                return false;
            }
         }
         return true;
     }
  }


  exports.add_user=function add_user(mail,user,password,callback){
      require('./crypo').encrypt(password,function(pass){
        var sql='insert into signup values(?,?,?);'
        db_con.query(sql,[user,pass,mail],function(err,result,fields){
            if(err) throw err;
            console.log("Account added successfully");
        })
        var sql1='insert into cart values(?,"");'
        db_con.query(sql1,[user],function(err,result,fields){
            if(err) throw err;
            console.log("cart created for user "+user);
        })
      });
  }

 exports.check_existing_user=function check_existing_user(name,pass,callback){
      var sql='select name from signup where name=?';
        db_con.query(sql,[name],function(err,res,fields){
            if(err){ 
                return err;
            }
            
            if(res.length>0){
                for(let i=0;i<res.length;i++){
                    if(res[i].name===name){
                        console.log(res[i].name);
                        callback(x={user_exist:true, crct_password:false});
                        return;
                    }
                }
                if(validate_password1(pass)){
                    callback(x={user_exist:false, crct_password:true});
                    return;
                }
                else{
                    callback(x={user_exist:false, crct_password:false});
                    return;
                }
            }
            else{
                if(validate_password1(pass)){
                    callback(x={user_exist:false, crct_password:true});
                    return;
                }
                else{
                    callback(x={user_exist:false, crct_password:false});
                    return;
            }
        }
        })
  }

  exports.check_existing_mail=function check_existing_mail(mail,callback){
    var sql='select name from signup where email=?';
    db_con.query(sql,[mail],function(err,result,fields){
        if(err) throw err;
        if(result.length>0){
            callback(true);
        }
        else{
            callback(false);
        }
    })
  }