

exports.AllProducts=function AllProducts(callback){
    var db_con=require('./dbconnection');
    var sql='select * from products order by Rand();';
    db_con.query(sql,function(err,result,fields){
        if(err) throw err;
        callback(result);
    });
}

exports.SearchProducts=function SearchProducts(searchname,callback){
    var db_con=require('./dbconnection');
    var sql='select * from products where keyword like ? order by Rand();';
    db_con.query(sql,['%'+searchname+'%'],function(err,result,fields){
        if(err) throw err;
        callback(result);
    });
}

exports.getCartSet=function getCartSet(username,callback){
    var db_con=require('./dbconnection');
    var sql='select * from cart where customername=?';
    db_con.query(sql,[username],function(err,result,fields){
        if(err) throw err;
        for(let i=0;i<result.length;i++){
            console.log(result);
            if(result[i].customername==username){
                callback(new Set(result[i].cartproducts.split('$')));
                return;
            }
        }
    });
}

exports.AddToCart=function AddToCart(username,productname,callback){
    var db_con=require('./dbconnection');
    var sql='select * from cart where customername=?';
    db_con.query(sql,[username],function(err,result,fields){
        if(err) throw err;

        var products;
        for(let i=0;i<result.length;i++){
            if(result[i].customername==username){
                username=result[i].customername;
                products=result[i].cartproducts;
            }
        }
        var x=new Set(products.split("$"));
        products=products+"$"+productname+"$";
        var sql2='update cart set cartproducts=? where customername=?';
        db_con.query(sql2,[products,username],function(err,result,fields){
            if(err) throw err;
            console.log("Successfully updated add cart ");
        })
        x.add(productname);
        callback(x);
    });
}

function AddToCart(product_id){
    var form=document.getElementById("form");
    var ID = document.createElement("input");
    ID.setAttribute("type", "text");
    ID.setAttribute("name", "productName");
    ID.setAttribute("value",product_id);
    ID.setAttribute("placeholder", "E-Mail ID");
    ID.style.display="none";
    form.append(ID); 
    document.getElementById("reload").click();
}