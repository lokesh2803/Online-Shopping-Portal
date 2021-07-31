exports.AddToOrders=function AddToOrders(login_id,name,address,mobileno,products,amount,callback){
    var db_con=require('./dbconnection');
    var date=new Date();
    var x=""+products[0];
    for(let i=1;i<products.length;i++){
        x=x+","+products[i];
    }
    console.log(x);
    var sql='insert into orders values(?,?,?,?,?,?,?)';
    db_con.query(sql,[login_id,name,address,mobileno,x,amount,date],function(err,result,fields){
        if(err) throw err;
        console.log("Order Success");
    })
    var sql1='update cart set cartproducts="" where customername=?';
    db_con.query(sql1,[login_id],function(err,result,fields){
        if(err) throw err;
        console.log("cart cleared");
    })
    callback(true);
}