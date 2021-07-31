module.exports=function getMailid(mail,callback){
  
  const db_con=require('./dbconnection');
  var sql='select email from signup where email=?';
  
  db_con.query(sql,[mail],function(err,result,fields){
    if(err) throw err;
    console.log(mail+" "+fields);
    if(result.length==0){
      callback(false);
    }
    else{
      callback(true);
    }
  })
}

function color(){
  document.getElementById("mailwrong").style.display="none";
}
