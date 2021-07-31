exports.orderDetails=function orderDetails(customer_id,callback){
    var db_con=require('./dbconnection');
    var sql='select * from orders where customerid=?';
    db_con.query(sql,[customer_id],function(err,result,fields){
        if(err) throw err;
        callback(result);
    })
}