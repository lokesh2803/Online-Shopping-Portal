function validate() {
    document.getElementById("popup1").style.display="none";
    var x= document.getElementById("password").value;
    if(x.length==0)
    document.getElementById("popup").style.display="none";
    if(x.length>0 && x.length<8)
        document.getElementById("popup").style.display="block";
    
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
                document.getElementById("popup").style.display="block";
                return;
            }
         }
         document.getElementById("popup").style.display="none";
     }
  }

  
  module.exports=function try_login(user,pass,goback){

    user=user.trim();
    const db_con=require('./dbconnection');
    var sql='SELECT * from signup where name=?;'
    db_con.query(sql,[user],function(err,result,fields){
        if(err) throw err;
        else if(result.length==0){
            console.log("Invalid Username/Password");
            var x={
                admit : false,
                mail : ""
            }
            goback(x);
        }
        else{
            var sqlpass="";
            var email="";
            for(let i=0;i<result.length;i++){
                if(result[i].name===user){
                    sqlpass=result[i].password;
                    email=result[i].email;
                    break;
                }
            }
            if(sqlpass==""){
                var x={
                    admit : false,
                    mail : ""
                }
                goback(x);
            }
            else{
                require('./crypo').decrypt(sqlpass,function(crctPass){
                    if(pass==crctPass){
                        var x={
                            admit : true,
                            mail : email
                        }
                        goback(x);
                    }   
                    else{
                        var x={
                            admit : false,
                            mail : ""
                        }
                        goback(x);
                    }
                        
                })
        }
        }
    })
    }


