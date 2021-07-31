const db_con = require("./dbconnection");

module.exports=function updatePassword(mail,pass,callback){
    require('./crypo').encrypt(pass,function(password){
    var sql= 'update signup set Password=? where email=?';
    db_con.query(sql,[password,mail],function(err,result,fields){
        if(err) throw err;
        console.log('Password Updated Successfully');
    })
})
}